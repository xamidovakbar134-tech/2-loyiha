"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation"; 

const AdminFullPage = () => {
  const [email, setEmail] = useState("admin@jobportal.com");
  const [password, setPassword] = useState("admin123");
  const router = useRouter();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "admin@jobportal.com" && password === "admin123") {
      localStorage.setItem("isAdmin", "true");

      router.push("/admin/adminJobs");

      window.location.href = "/admin/adminJobs";
    } else {
      alert("Email yoki parol xato!");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
      <main className="flex-1 flex flex-col items-center justify-center p-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-[#1e3a8a] text-white font-bold p-2 rounded-lg text-xl">
              JP
            </div>
            <h1 className="font-bold! text-black">Job Portal</h1>
          </div>
          <h2 className="text-4xl font-extrabold text-gray-800! mb-2">
            Admin Dashboard
          </h2>
          <p className="text-gray-500 text-lg">
            Sign in to manage job postings
          </p>
        </div>

        <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 w-full max-w-lg">
          <form onSubmit={handleSignIn} className="space-y-6">
            <div>
              <label className="block text-gray-700! font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 p-2 rounded-lg focus:ring-2! focus:ring-blue-500! outline-none! transition!"
                placeholder="admin@jobportal.com"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-200 p-2 rounded-lg focus:ring-2! focus:ring-blue-500! outline-none! transition!"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-900 text-white py-2 rounded-2 font-bold! text-lg! transition shadow-lg!"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 bg-[#f3f0f1] p-3 rounded-xl border border-gray-200/50">
            <p className="font-bold text-gray-800! mb-2">Demo Credentials:</p>
            <div className="text-gray-600! space-y-1!">
              <p>Email: admin@jobportal.com</p>
              <p>Password: admin123</p>
            </div>
          </div>
        </div>

        <Link href="/">
          <button className="mt-8! text-blue-800 font-semibold hover:underline decoration-2 underline-offset-4">
            Back to Home
          </button>
        </Link>
      </main>
    </div>
  );
};

export default AdminFullPage;
