import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function AdminLogin() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include", // important for cookie support
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      router.push("/admin/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: "url('/images/leh-bg.jpg')" }}
    >
      {/* Login Form */}
      <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
        <form
          onSubmit={handleLogin}
          className="backdrop-blur-lg bg-white/20 border border-white/30 p-8 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.2)] w-full max-w-md space-y-6 animate-fadeInDown"
        >
          <h2 className="text-3xl font-bold text-center text-white drop-shadow-lg">
            Admin Login
          </h2>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
            className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-white bg-white/70 text-black placeholder-gray-600"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-white bg-white/70 text-black placeholder-gray-600"
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
