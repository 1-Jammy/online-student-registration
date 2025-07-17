"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useRef } from "react";

export default function Home() {
  // Registration state
  const [register, setRegister] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [registerErrors, setRegisterErrors] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    password: "",
    server: "",
  });
  const [registerSubmitting, setRegisterSubmitting] = useState(false);
  // Login state
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [loginErrors, setLoginErrors] = useState({
    email: "",
    password: "",
    server: "",
  });
  const [loginSubmitting, setLoginSubmitting] = useState(false);
  // Password visibility
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  // Dialog open state to reset forms
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  // Refs for autoFocus
  const registerFirstNameRef = useRef<HTMLInputElement>(null);
  const loginEmailRef = useRef<HTMLInputElement>(null);
  // Add state for registration step, confirm password, and mobile
  const [registerStep, setRegisterStep] = useState(1);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [mobile, setMobile] = useState("");

  // Reset registration form when dialog opens or closes
  const handleRegisterDialogOpen = (open: boolean) => {
    setRegisterDialogOpen(open);
    if (open) {
      setRegister({ first_name: "", middle_name: "", last_name: "", email: "", password: "" });
      setRegisterErrors({ first_name: "", middle_name: "", last_name: "", email: "", password: "", server: "" });
      setMobile("");
      setConfirmPassword("");
      setConfirmPasswordError("");
      setRegisterStep(1);
      setTimeout(() => registerFirstNameRef.current?.focus(), 100);
    }
  };
  // Reset login form when dialog opens
  const handleLoginDialogOpen = (open: boolean) => {
    setLoginDialogOpen(open);
    if (open) {
      setLogin({ email: "", password: "" });
      setLoginErrors({ email: "", password: "", server: "" });
      setTimeout(() => loginEmailRef.current?.focus(), 100);
    }
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Registration handler
  const handleRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (registerStep === 1) return; // Prevent submit on step 1
    setConfirmPasswordError("");
    if (register.password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }
    const newErrors = { first_name: "", middle_name: "", last_name: "", email: "", password: "", server: "" };
    if (!register.email) newErrors.email = "Email is required";
    else if (!validateEmail(register.email)) newErrors.email = "Invalid email format";
    if (!register.password) newErrors.password = "Password is required";
    else if (register.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    // Add password requirements validation
    const numbers = (register.password.match(/\d/g) || []).length;
    if (numbers < 2) newErrors.password = "Password must have at least 2 numbers";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(register.password)) newErrors.password = "Password must have at least one special character";
    if (!/[A-Z]/.test(register.password)) newErrors.password = "Password must have at least one uppercase letter";
    if (!/[a-z]/.test(register.password)) newErrors.password = "Password must have at least one lowercase letter";
    setRegisterErrors(newErrors);
    if (Object.values(newErrors).some((v) => v)) return;
    setRegisterSubmitting(true);
    try {
      const res = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...register, mobile }),
      });
      const result = await res.json();
      if (!res.ok) {
        setRegisterErrors((prev) => ({ ...prev, server: result.error || "Registration failed" }));
        setRegisterSubmitting(false);
        return;
      }
      window.location.href = "/dashboard";
    } catch (err) {
      setRegisterErrors((prev) => ({ ...prev, server: "Something went wrong" }));
    } finally {
      setRegisterSubmitting(false);
    }
  };

  // Login handler
  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const newErrors = { email: "", password: "", server: "" };
    if (!login.email) newErrors.email = "Email is required";
    else if (!validateEmail(login.email)) newErrors.email = "Invalid email format";
    if (!login.password) newErrors.password = "Password is required";
    else if (login.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    setLoginErrors(newErrors);
    if (Object.values(newErrors).some((v) => v)) return;
    setLoginSubmitting(true);
    try {
      const res = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(login),
      });
      const result = await res.json();
      if (!res.ok) {
        setLoginErrors((prev) => ({ ...prev, server: result.error || "Login failed" }));
        setLoginSubmitting(false);
        return;
      }
      if (result.is_admin) {
        window.location.href = "/admin";
      } else {
        window.location.href = "/dashboard";
      }
    } catch (err) {
      setLoginErrors((prev) => ({ ...prev, server: "Something went wrong" }));
    } finally {
      setLoginSubmitting(false);
    }
  };

  // Add password strength utility function above the component
  function getPasswordStrength(password: string) {
    let score = 0;
    const requirements = {
      length: password.length >= 6,
      numbers: (password.match(/\d/g) || []).length >= 2,
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
    };
    score += requirements.length ? 1 : 0;
    score += requirements.numbers ? 1 : 0;
    score += requirements.special ? 1 : 0;
    score += requirements.upper ? 1 : 0;
    score += requirements.lower ? 1 : 0;
    let label = "Weak";
    let color = "bg-red-500";
    if (score >= 5) {
      label = "Strong";
      color = "bg-green-500";
    } else if (score >= 4) {
      label = "Good";
      color = "bg-yellow-400";
    } else if (score >= 3) {
      label = "Medium";
      color = "bg-orange-400";
    }
    return { score, label, color, requirements };
  }

  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#f5f5ff] roboto">
      {/* Left: Text & CTA */}
      <div className="flex flex-col justify-center px-8 md:px-20 py-16 relative">
        {/* Decorative shapes */}

        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-4 open-sans">
          Welcome to <br />
          Springfield Institute
        </h1>
        <p className="text-gray-900 mb-8 md:text-lg ">
          Your gateway to academic excellence. Register today and start your success journey with us.
        </p>

        <div className="flex justify-center">
          <div className="flex flex-col items-center pt-40 space-y-4">
            {/* Dialog Trigger */}
            <Dialog open={registerDialogOpen} onOpenChange={handleRegisterDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="default" className="bg-yellow-500 hover:bg-yellow-600 text-current w-80 h-12">Enroll Now</Button>
              </DialogTrigger>

              {/* Dialog Content */}
              <DialogContent className="max-w-md sm:max-w-xl">
                <DialogHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {/* Institution logo placeholder */}
                    <span className="material-symbols-rounded text-[2rem] text-[#1976d2]">account_circle</span>
                    <DialogTitle>Join us</DialogTitle>
                  </div>
                  <DialogDescription>Enter your credentials to continue.</DialogDescription>
                </DialogHeader>
                <form autoComplete="off" className="my-10 mx-4" onSubmit={handleRegister}>
                  <AnimatePresence mode="wait" initial={false}>
                    {registerStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ x: 40, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -40, opacity: 0 }}
                        transition={{ duration: 0.1, ease: "easeOut" }}
                      >
                        {/* Section 1: Name and Mobile */}
                        <div className="space-y-6">
                          <div className="flex items-center gap-2 mb-1">
                            <label htmlFor="register-first-name" className="relative w-full text-current roboto indent-1 whitespace-nowrap">First Name</label>
                            {registerErrors.first_name && (
                              <span className="flex items-center text-red-500 text-xs whitespace-nowrap"><span className="material-symbols-rounded text-base text-[#d32f2f] mr-1">warning</span>{registerErrors.first_name}</span>
                            )}
                          </div>
                          <input
                            id="register-first-name"
                            ref={registerFirstNameRef}
                            type="text"
                            placeholder="Jayesh"
                            className="w-full px-4 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                            value={register.first_name}
                            onChange={(e) => setRegister((prev) => ({ ...prev, first_name: e.target.value }))}
                            autoFocus
                          />
                          <div className="flex items-center gap-2 mb-1">
                            <label htmlFor="register-middle-name" className="relative w-full text-current roboto indent-1 whitespace-nowrap">Middle Name</label>
                            {registerErrors.middle_name && (
                              <span className="flex items-center text-red-500 text-xs whitespace-nowrap"><span className="material-symbols-rounded text-base text-[#d32f2f] mr-1">warning</span>{registerErrors.middle_name}</span>
                            )}
                          </div>
                          <input
                            id="register-middle-name"
                            type="text"
                            placeholder="Rajesh"
                            className="w-full px-4 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                            value={register.middle_name}
                            onChange={(e) => setRegister((prev) => ({ ...prev, middle_name: e.target.value }))}
                          />
                          <div className="flex items-center gap-2 mb-1">
                            <label htmlFor="register-last-name" className="relative w-full text-current roboto indent-1 whitespace-nowrap">Last Name</label>
                            {registerErrors.last_name && (
                              <span className="flex items-center text-red-500 text-xs whitespace-nowrap"><span className="material-symbols-rounded text-base text-[#d32f2f] mr-1">warning</span>{registerErrors.last_name}</span>
                            )}
                          </div>
                          <input
                            id="register-last-name"
                            type="text"
                            placeholder="Khare"
                            className="w-full px-4 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                            value={register.last_name}
                            onChange={(e) => setRegister((prev) => ({ ...prev, last_name: e.target.value }))}
                          />
                          <div className="flex items-center gap-2 mb-1">
                            <label htmlFor="register-mobile" className="relative w-full text-current roboto indent-1 whitespace-nowrap">Mobile Number</label>
                            {registerErrors.server && (
                              <span className="flex items-center text-red-500 text-xs whitespace-nowrap"><span className="material-symbols-rounded text-base text-[#d32f2f] mr-1">warning</span>{registerErrors.server}</span>
                            )}
                          </div>
                          <input
                            id="register-mobile"
                            type="tel"
                            placeholder="9876543210"
                            className="w-full px-4 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            pattern="[0-9]{10}"
                            maxLength={10}
                          />
                          <Button
                            type="button"
                            className="rounded-md w-full bg-gray-200 text-gray-700 open-sans font-semibold py-6.5 text-md hover:bg-gray-300"
                            onClick={() => {
                              // Validate section 1 fields
                              const newErrors = {
                                first_name: register.first_name ? '' : 'Please enter your first name',
                                middle_name: register.middle_name ? '' : 'Please enter your middle name',
                                last_name: register.last_name ? '' : 'Please enter your last name',
                                email: '',
                                password: '',
                                server: '',
                              };
                              let mobileError = '';
                              if (!mobile) mobileError = 'Please enter your mobile number';
                              else if (!/^\d{10}$/.test(mobile)) mobileError = 'Enter a valid 10-digit mobile number';
                              setRegisterErrors(newErrors);
                              if (!newErrors.first_name && !newErrors.middle_name && !newErrors.last_name && !mobileError) {
                                setRegisterStep(2);
                              } else if (mobileError) {
                                setRegisterErrors((prev) => ({ ...prev, server: mobileError }));
                              }
                            }}
                          >
                            Continue
                          </Button>
                        </div>
                      </motion.div>
                    )}
                    {registerStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ x: 40, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -40, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                      >
                        {/* Section 2: Email, Password, Confirm Password, Strength Bar */}
                        <div className="space-y-6">
                          <div className="flex items-center gap-2 mb-1">
                            <label htmlFor="register-email" className="relative w-full text-current roboto indent-1 whitespace-nowrap">Email</label>
                            {registerErrors.email && (
                              <span className="flex items-center text-red-500 text-xs whitespace-nowrap"><span className="material-symbols-rounded text-base text-[#d32f2f] mr-1">warning</span>{registerErrors.email}</span>
                            )}
                          </div>
                          <input
                            id="register-email"
                            type="email"
                            placeholder="example123@email.com"
                            className="w-full px-4 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                            value={register.email}
                            onChange={(e) => setRegister((prev) => ({ ...prev, email: e.target.value }))}
                          />
                          <div className="flex items-center gap-2 mb-1">
                            <label htmlFor="register-password" className="relative w-full text-current roboto indent-1 whitespace-nowrap">Password</label>
                            {registerErrors.password && (
                              <span className="flex items-center text-red-500 text-xs whitespace-nowrap"><span className="material-symbols-rounded text-base text-[#d32f2f] mr-1">warning</span>{registerErrors.password}</span>
                            )}
                          </div>
                          <div className="relative w-full">
                            <input
                              id="register-password"
                              type={showRegisterPassword ? "text" : "password"}
                              placeholder="Password"
                              className="w-full px-4 pr-12 bg-white py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                              value={register.password}
                              onChange={(e) => setRegister((prev) => ({ ...prev, password: e.target.value }))}
                            />
                            <button
                              type="button"
                              aria-label={showRegisterPassword ? "Hide password" : "Show password"}
                              onClick={() => setShowRegisterPassword((v) => !v)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 p-2.5"
                            >
                              {showRegisterPassword ? <span className="material-symbols-rounded text-xl text-[#1976d2]">visibility_off</span> : <span className="material-symbols-rounded text-xl text-[#1976d2]">visibility</span>}
                            </button>
                          </div>
                          <div className="flex items-center gap-2 mb-1">
                            <label htmlFor="register-confirm-password" className="relative w-full text-current roboto indent-1 whitespace-nowrap">Confirm Password</label>
                            {confirmPasswordError && (
                              <span className="flex items-center text-red-500 text-xs whitespace-nowrap"><span className="material-symbols-rounded text-base text-[#d32f2f] mr-1">warning</span>{confirmPasswordError}</span>
                            )}
                          </div>
                          <div className="relative w-full">
                            <input
                              id="register-confirm-password"
                              type={showRegisterPassword ? "text" : "password"}
                              placeholder="Confirm Password"
                              className="w-full px-4 pr-12 bg-white py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                          </div>
                          {/* Password strength bar below confirm password */}
                          {register.password && (
                            (() => {
                              const { score, label, color, requirements } = getPasswordStrength(register.password);
                              return (
                                <div className="mt-2">
                                  <div className="w-full h-2 rounded bg-gray-200">
                                    <div className={`h-2 rounded transition-all duration-300 ${color}`} style={{ width: `${score * 20}%` }}></div>
                                  </div>
                                  <div className="flex justify-between text-xs mt-1">
                                    <span className={`font-semibold ${color.replace('bg-', 'text-')}`}>{label}</span>
                                    <span className="text-gray-500">{score}/5</span>
                                  </div>
                                  <ul className="text-xs mt-1 space-y-0.5">
                                    <li className={requirements.length ? 'text-green-600' : 'text-gray-400'}>At least 6 characters</li>
                                    <li className={requirements.numbers ? 'text-green-600' : 'text-gray-400'}>At least 2 numbers</li>
                                    <li className={requirements.special ? 'text-green-600' : 'text-gray-400'}>One special character</li>
                                    <li className={requirements.upper ? 'text-green-600' : 'text-gray-400'}>One uppercase letter</li>
                                    <li className={requirements.lower ? 'text-green-600' : 'text-gray-400'}>One lowercase letter</li>
                                  </ul>
                                </div>
                              );
                            })()
                          )}
                          <div className="flex justify-between mt-8">
                            <Button
                              type="button"
                              className="rounded-md bg-gray-200 text-gray-700 open-sans font-semibold py-6.5 text-md hover:bg-gray-300"
                              onClick={() => setRegisterStep(1)}
                            >
                              Back
                            </Button>
                            <Button
                              type="submit"
                              className="rounded-md bg-yellow-400 text-current open-sans font-semibold py-6.5 text-md hover:bg-yellow-500"
                              disabled={registerSubmitting}
                            >
                              {registerSubmitting ? (
                                <span className="flex items-center justify-center">
                                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
                                  Get Enrolled
                                </span>
                              ) : "Get Enrolled"}
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </DialogContent>
            </Dialog>

            <div className="text-sm text-gray-500">------------------ OR ------------------</div>
            {/* Dialog Trigger */}
            <Dialog open={loginDialogOpen} onOpenChange={handleLoginDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="default" className="bg-yellow-500 hover:bg-yellow-600 text-current w-80 h-12">Log In</Button>
              </DialogTrigger>

              {/* Dialog Content */}
              <DialogContent className="max-w-md sm:max-w-md">
                <DialogHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-rounded text-[2rem] text-[#1976d2]">account_circle</span>
                    <DialogTitle>Log in</DialogTitle>
                  </div>
                  <DialogDescription>Enter your credentials to continue.</DialogDescription>
                </DialogHeader>
                <form autoComplete="off" className="space-y-6 mt-4" onSubmit={handleLogin}>
                  <div className="flex items-center gap-2 mb-1">
                    <label htmlFor="login-email" className="relative w-full text-current roboto indent-1 whitespace-nowrap">Email</label>
                    {loginErrors.email && (
                      <span className="flex items-center text-red-500 text-xs whitespace-nowrap"><span className="material-symbols-rounded text-base text-[#d32f2f] mr-1">warning</span>{loginErrors.email}</span>
                    )}
                  </div>
                  <input
                    id="login-email"
                    ref={loginEmailRef}
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                    value={login.email}
                    onChange={(e) => setLogin((prev) => ({ ...prev, email: e.target.value }))}
                    autoFocus
                  />
                  <div className="flex items-center gap-2 mb-1">
                    <label htmlFor="login-password" className="relative w-full text-current roboto indent-1 whitespace-nowrap">Password</label>
                    {loginErrors.password && (
                      <span className="flex items-center text-red-500 text-xs whitespace-nowrap"><span className="material-symbols-rounded text-base text-[#d32f2f] mr-1">warning</span>{loginErrors.password}</span>
                    )}
                  </div>
                  <div className="relative w-full">
                    <input
                      id="login-password"
                      type={showLoginPassword ? "text" : "password"}
                      placeholder="Password"
                      className="w-full px-4 pr-12 bg-white py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                      value={login.password}
                      onChange={(e) => setLogin((prev) => ({ ...prev, password: e.target.value }))}
                    />
                    <button
                      type="button"
                      aria-label={showLoginPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowLoginPassword((v) => !v)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 p-2.5"
                    >
                      {showLoginPassword ? <span className="material-symbols-rounded text-xl text-[#1976d2]">visibility_off</span> : <span className="material-symbols-rounded text-xl text-[#1976d2]">visibility</span>}
                    </button>
                  </div>
                  <div className="mt-2">
                    <a href="#" className="text-xs text-blue-600 hover:underline">Forgot password?</a>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="flex items-center text-red-500 text-xs whitespace-nowrap"><span className="material-symbols-rounded text-base text-[#d32f2f] mr-1">warning</span>{loginErrors.server}</span>
                  </div>
                  <Button
                    type="submit"
                    className="w-full rounded-md mt-8 bg-yellow-400 text-black py-6.5 text-lg hover:bg-yellow-500"
                    disabled={loginSubmitting}
                  >
                    {loginSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
                        Logging in...
                      </span>
                    ) : "Login"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Right: Background image */}
      <div className="hidden md:block relative">
        <Image
          src="https://plus.unsplash.com/premium_photo-1679916743693-03ea85e16b5c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="College"
          fill
          className="object-cover"
        />
      </div>
    </main>
  );
}
