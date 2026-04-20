"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  // 🔒 PROTEKSI LOGIN
  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    if (!isLogin) {
      router.push("/login");
    }
  }, []);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#f8fafc] px-4 relative">

      {/* LOGOUT BUTTON */}
      <button
        onClick={() => {
          localStorage.removeItem("isLogin");
          router.push("/login");
        }}
        className="absolute top-6 right-6 bg-red-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-600"
      >
        Logout
      </button>

      {/* DECORATION */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-100 rounded-full blur-3xl opacity-50"></div>

      {/* HERO */}
      <div className="relative z-10 text-center mb-12">
        <div className="inline-block bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-4 border border-blue-100">
          Administrator Panel
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-6">
          Puncak Mas <span className="text-blue-600">CMS.</span>
        </h1>

        <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
          Solusi terintegrasi untuk pengelolaan destinasi wisata.
          Pantau transaksi, data pengunjung, dan kelola konten dalam satu dasbor yang cerdas.
        </p>
      </div>

      {/* MENU */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">

        <MenuCard
          href="/dashboard"
          emoji="📊"
          title="Dashboard"
          desc="Ringkasan data & statistik real-time."
          color="hover:border-blue-500"
        />

        <MenuCard
          href="/detail_wisata"
          emoji="🏞️"
          title="Data Wisata"
          desc="Kelola informasi & konten wisata."
          color="hover:border-emerald-500"
        />

        <MenuCard
          href="/transaksi"
          emoji="💰"
          title="Transaksi"
          desc="Catat & pantau penjualan tiket."
          color="hover:border-amber-500"
        />

        <MenuCard
          href="/pengunjung"
          emoji="👥"
          title="Pengunjung"
          desc="Analisa data kunjungan harian."
          color="hover:border-purple-500"
        />

      </div>

      {/* FOOTER */}
      <div className="mt-16 flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
        <span className="w-8 h-[1px] bg-slate-200"></span>
        Powered by NestJS & Next.js
        <span className="w-8 h-[1px] bg-slate-200"></span>
      </div>
    </div>
  );
}

// COMPONENT CARD
function MenuCard({
  href,
  emoji,
  title,
  desc,
  color,
}: {
  href: string;
  emoji: string;
  title: string;
  desc: string;
  color: string;
}) {
  return (
    <Link href={href} className="group">
      <div
        className={`h-full bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${color}`}
      >
        <div className="text-4xl mb-6 group-hover:scale-125 transition-transform">
          {emoji}
        </div>
        <h3 className="text-xl font-black text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-500 text-sm">{desc}</p>
        <div className="mt-6 text-blue-600 font-black text-[10px] opacity-0 group-hover:opacity-100">
          Buka Menu →
        </div>
      </div>
    </Link>
  );
}