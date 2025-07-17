'use client';
import { useState } from 'react';

export default function Page() {
  const [section, setSection] = useState<'dashboard' | 'about' | 'admission' | 'placement' | 'contact' | 'notice' | ''>('dashboard');
  const [step, setStep] = useState<'form' | 'payment' | 'success'>('form');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePayment = () => {
    setTimeout(() => {
      setStep('success');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-yellow-50 font-sans text-gray-800">
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full bg-yellow-500 text-white px-6 py-4 flex justify-between items-center shadow-lg z-50">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="Logo" className="w-8 h-8" />
          <span className="font-bold text-xl">Springfield Institute</span>
        </div>
        <nav className="space-x-6 text-sm hidden md:flex">
          {['about', 'admission', 'placement', 'notice', 'contact'].map((sec) => (
            <button
              key={sec}
              onClick={() => setSection(sec as any)}
              className={`transition duration-200 border-b-2 ${
                section === sec
                  ? 'border-white font-semibold'
                  : 'border-transparent hover:border-white hover:font-medium'
              }`}
            >
              {sec.charAt(0).toUpperCase() + sec.slice(1)}
            </button>
          ))}
        </nav>
      </header>

      {/* Dashboard */}
      {section === 'dashboard' && (
        <section
          className="h-screen w-full bg-cover bg-center flex items-center justify-center relative"
          style={{ backgroundImage: `url('/college.jpg')` }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 z-10" />
          {/* Content */}
          <div className="relative z-20 text-center text-white max-w-2xl px-4 animate-fadeIn">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
              🎓 Admission Open 2025
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Begin your journey with Springfield Institute, Nagpur’s top-ranked engineering and commerce college.
            </p>
            <button
              onClick={() => {
                setSection('');
                setStep('form');
              }}
              className="bg-white text-yellow-600 border-2 border-white hover:bg-yellow-600 hover:text-white transition-all duration-300 px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl scale-100 hover:scale-105"
            >
               Take Admission
            </button>
          </div>
        </section>
      )}

      {/* Admission Form */}
      {!section && step === 'form' && (
        <div className="max-w-xl mx-auto mt-28 p-6 bg-white rounded shadow animate-fadeSlide">
          <h2 className="text-xl font-bold mb-4 text-center">Admission Form</h2>
          <form onSubmit={handleFormSubmit} className="space-y-3">
            <input className="w-full border p-2 rounded" placeholder="Full Name" required />
            <input type="email" className="w-full border p-2 rounded" placeholder="Email ID" required />
            <input type="tel" className="w-full border p-2 rounded" placeholder="Phone Number" required />
            <input type="date" className="w-full border p-2 rounded" required />
            <input className="w-full border p-2 rounded" placeholder="CET Score" required />
            <select className="w-full border p-2 rounded" required>
              <option value="">Select Course</option>
              <option>B.Tech</option>
              <option>B.Sc IT</option>
              <option>B.Com</option>
            </select>
            <input className="w-full border p-2 rounded" placeholder="12th Marks (%)" required />
            <textarea className="w-full border p-2 rounded" placeholder="Address" required />
            <input type="file" className="w-full border p-2 rounded" />
            <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white w-full py-2 rounded font-semibold">
              Submit & Proceed to Pay
            </button>
          </form>
        </div>
      )}

      {/* Payment */}
      {step === 'payment' && !section && (
        <div className="max-w-xl mx-auto mt-28 p-6 bg-white rounded shadow text-center">
          <h2 className="text-xl font-bold mb-4">💳 Fee Payment</h2>
          <table className="w-full border text-sm mb-4">
            <thead className="bg-yellow-100">
              <tr>
                <th className="border p-2">Course</th>
                <th className="border p-2">Tuition</th>
                <th className="border p-2">Hostel</th>
                <th className="border p-2">Exam</th>
                <th className="border p-2 font-bold">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">B.Tech</td>
                <td className="border p-2">₹60,000</td>
                <td className="border p-2">₹25,000</td>
                <td className="border p-2">₹5,000</td>
                <td className="border p-2 font-bold">₹90,000</td>
              </tr>
            </tbody>
          </table>
          <button
            onClick={handlePayment}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded w-full"
          >
            Confirm & Pay
          </button>
        </div>
      )}

      {/* Success */}
      {step === 'success' && !section && (
        <div className="max-w-xl mx-auto mt-28 p-6 bg-green-100 text-green-800 rounded shadow text-center">
          <h3 className="text-xl font-bold">🎉 Payment Successful!</h3>
          <p className="mt-2">Transaction ID: <span className="font-mono">TXN2025XYZ</span></p>
          <div className="mt-4 space-x-3">
            <button className="bg-gray-800 text-white px-4 py-2 rounded">🧾 Download Receipt</button>
            <button className="bg-blue-700 text-white px-4 py-2 rounded">📄 Download Brochure</button>
          </div>
        </div>
      )}

      {/* About */}
      {section === 'about' && (
        <div className="max-w-5xl mx-auto mt-28 p-6 bg-white rounded shadow">
          <h2 className="text-2xl font-bold mb-4">🏛️ About Springfield Institute</h2>
          <p>
            Springfield Institute of Engineering, Nagpur is one of the top institutions in Maharashtra.
            Approved by AICTE and affiliated to RTMNU, the college offers programs in B.Tech, B.Sc, B.Com and more.
          </p>
          <ul className="list-disc pl-5 mt-4 space-y-1">
            <li>Established: 1984</li>
            <li>NAAC Accredited A+</li>
            <li>Modern Labs, Wi-Fi Campus, Research Centers</li>
            <li>100+ Ph.D Faculty Members</li>
          </ul>
        </div>
      )}

      {/* Admission Fee Info */}
      {section === 'admission' && (
        <div className="max-w-4xl mx-auto mt-28 p-6 bg-white rounded shadow">
          <h2 className="text-2xl font-bold mb-4 text-center">📘 College Fee Structure (2025)</h2>
          <table className="w-full border text-sm">
            <thead className="bg-yellow-100">
              <tr>
                <th className="border p-2">Course</th>
                <th className="border p-2">Tuition</th>
                <th className="border p-2">Hostel</th>
                <th className="border p-2">Exam</th>
                <th className="border p-2 font-bold">Total</th>
              </tr>
            </thead>
            <tbody>
              {[['B.Tech', 60000, 25000, 5000], ['B.Sc IT', 25000, 15000, 2000], ['B.Com', 20000, 10000, 1500]].map(
                ([course, tuition, hostel, exam]) => {
                  const total = Number(tuition) + Number(hostel) + Number(exam);
                  return (
                    <tr key={course}>
                      <td className="border p-2">{course}</td>
                      <td className="border p-2">₹{tuition}</td>
                      <td className="border p-2">₹{hostel}</td>
                      <td className="border p-2">₹{exam}</td>
                      <td className="border p-2 font-bold">₹{total}</td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Placement */}
      {section === 'placement' && (
        <div className="max-w-4xl mx-auto mt-28 p-6 bg-white rounded shadow">
          <h2 className="text-2xl font-bold mb-4">📈 Placement Highlights</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>92% Placement in 2024 batch</li>
            <li>Top recruiters: TCS, Infosys, Wipro, Amazon</li>
            <li>Average Package: ₹6.5 LPA</li>
            <li>Dedicated Training & Internship Cell</li>
          </ul>
        </div>
      )}

      {/* Notice */}
      {section === 'notice' && (
        <div className="max-w-4xl mx-auto mt-28 p-6 bg-white rounded shadow">
          <h2 className="text-2xl font-bold mb-4">📢 Important Notices</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Admissions open till August 31st, 2025</li>
            <li>Counseling for CET rank holders on July 25th</li>
            <li>New hostel block inauguration on August 10</li>
            <li>Mid-semester exams start from October 15</li>
          </ul>
        </div>
      )}

      {/* Contact */}
      {section === 'contact' && (
        <div className="max-w-3xl mx-auto mt-28 p-6 bg-white rounded shadow">
          <h2 className="text-2xl font-bold mb-4">📞 Contact Us</h2>
          <p>📍 Springfield Institute, Nagpur, Maharashtra - 440001</p>
          <p>📧 Email: info@springfield.edu.in</p>
          <p>📱 Phone: +91-9876543210</p>
          <p className="mt-4">Office Hours: Mon–Sat, 10:00 AM – 5:00 PM</p>
        </div>
      )}

      {/* Footer (only for dashboard) */}
      {section === 'dashboard' && (
        <footer className="bg-gray-900 text-gray-300 px-6 py-10">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
            <div>
              <h2 className="text-xl font-bold text-white">Springfield Institute</h2>
              <p className="text-sm mt-1">Nagpur, Maharashtra – 440001</p>
            </div>
            <div>
              <p className="text-sm">Email: info@springfield.edu.in</p>
              <p className="text-sm">Phone: +91-9876543210</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">© 2025 All rights reserved.</p>
              <p className="text-xs">Designed by Springfield Web Team</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
