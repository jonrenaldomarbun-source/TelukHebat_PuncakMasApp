"use client";
import { useEffect, useState } from "react";

type TransaksiType = {
  id: number;
  total: number;
  jumlah: number;
};

export default function Dashboard() {
  const [data, setData] = useState<TransaksiType[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:3000/wisata";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API_URL, { cache: "no-store" });
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Gagal ambil data dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalTransaksi = data.length;
  const totalPemasukan = data.reduce((sum, item) => sum + (item.total || 0), 0);
  const totalPengunjung = data.reduce((sum, item) => sum + (item.jumlah || 0), 0);

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(angka);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            🚀 Dashboard Utama
          </h1>
          <p className="text-slate-500 font-medium">Ringkasan aktivitas Puncak Mas hari ini.</p>
        </header>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          {/* CARD 1: TRANSAKSI */}
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 text-6xl opacity-10 group-hover:scale-110 transition-transform">📝</div>
            <p className="text-xs font-black uppercase text-slate-400 tracking-widest mb-1">Total Transaksi</p>
            <h2 className="text-4xl font-black text-slate-800">{totalTransaksi}</h2>
            <div className="mt-4 flex items-center text-xs font-bold text-blue-600 bg-blue-50 w-fit px-3 py-1 rounded-full">
              ↑ 12% dari kemarin
            </div>
          </div>

          {/* CARD 2: PEMASUKAN */}
          <div className="bg-blue-600 p-6 rounded-[2rem] shadow-xl shadow-blue-100 relative overflow-hidden group text-white">
            <div className="absolute -right-4 -top-4 text-6xl opacity-20 group-hover:scale-110 transition-transform">💰</div>
            <p className="text-xs font-black uppercase text-blue-200 tracking-widest mb-1">Total Pemasukan</p>
            <h2 className="text-3xl font-black">{formatRupiah(totalPemasukan)}</h2>
            <p className="mt-4 text-xs font-medium text-blue-100 opacity-80 italic">Saldo masuk otomatis ke sistem</p>
          </div>

          {/* CARD 3: PENGUNJUNG */}
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 text-6xl opacity-10 group-hover:scale-110 transition-transform">👥</div>
            <p className="text-xs font-black uppercase text-slate-400 tracking-widest mb-1">Total Pengunjung</p>
            <h2 className="text-4xl font-black text-slate-800">{totalPengunjung}</h2>
            <div className="mt-4 flex items-center text-xs font-bold text-green-600 bg-green-50 w-fit px-3 py-1 rounded-full">
              Status: Area Terkendali
            </div>
          </div>

        </div>

        {/* BOTTOM SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black mb-4">Grafik Mingguan</h3>
            <div className="h-48 w-full bg-slate-50 rounded-3xl flex items-center justify-center border-2 border-dashed border-slate-200">
              <p className="text-slate-400 text-sm font-bold italic">Visualisasi data sedang diproses...</p>
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-black mb-2">Sistem Operasional</h3>
              <p className="text-slate-400 text-sm mb-6">Server Backend NestJS dalam kondisi prima.</p>
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
                  <span className="text-sm font-bold uppercase tracking-wider text-slate-400">Database Connection</span>
                  <span className="text-green-400 font-black tracking-widest text-xs">ONLINE</span>
                </div>
                <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
                  <span className="text-sm font-bold uppercase tracking-wider text-slate-400">Security Guard</span>
                  <span className="text-blue-400 font-black tracking-widest text-xs">ENCRYPTED</span>
                </div>
              </div>
            </div>
            {/* Dekorasi lingkaran di background */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          </div>
        </div>

      </div>
    </div>
  );
}