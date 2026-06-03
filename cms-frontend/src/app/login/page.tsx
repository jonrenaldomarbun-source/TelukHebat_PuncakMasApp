"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokenResult, setTokenResult] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Username dan password wajib diisi!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login gagal!");
      }

      // Simpan JWT
      localStorage.setItem("admin_token", data.access_token);

      // Tampilkan JWT ke layar
      setTokenResult(data.access_token);
    } catch (error: any) {
      alert(error.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  const salinKeClipboard = () => {
    navigator.clipboard.writeText(tokenResult);

    sessionStorage.setItem("isLogin", "true");

    alert("Token berhasil disalin!");

    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-black mb-6 text-center">
          Login Admin
        </h1>

        {!tokenResult ? (
          <div className="space-y-4">
            <input
              className="w-full border p-3 rounded-xl"
              placeholder="Username"
              disabled={loading}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              className="w-full border p-3 rounded-xl"
              placeholder="Password"
              disabled={loading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all"
            >
              {loading ? "Memverifikasi..." : "Login"}
            </button>
          </div>
        ) : (
          <div className="space-y-4 text-center">
            <div className="p-3 bg-green-50 text-green-700 text-sm font-bold rounded-xl">
              🎉 Login Berhasil!
            </div>

            <p className="text-xs text-slate-500 font-medium text-left">
              JWT Token:
            </p>

            <textarea
              readOnly
              className="w-full h-24 border p-2 rounded-xl text-xs font-mono bg-slate-50"
              value={tokenResult}
            />

            <button
              onClick={salinKeClipboard}
              className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700"
            >
              📋 Salin Token & Masuk Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}