"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("is_logged_in") === "true";
    const isAdmin = localStorage.getItem("is_admin") === "true";
    if (!isLoggedIn) {
      router.replace("/"); // redirect to login
    } else if (!isAdmin) {
      router.replace("/dashboard"); // redirect to user dashboard
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome, Admin! You have access to this page.</p>
    </div>
  );
}
