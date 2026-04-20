"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    // login sederhana (hardcode dulu)
    if (username === "admin" && password === "123") {
      localStorage.setItem("isLogin", "true");
      router.push("/"); // masuk ke dashboard
    } else {
      alert("Username atau password salah!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-black mb-6 text-center">Login Admin</h1>

        <div className="space-y-4">
          <input
            className="w-full border p-3 rounded-xl"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            className="w-full border p-3 rounded-xl"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}