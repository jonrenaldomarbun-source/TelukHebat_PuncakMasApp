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

        {/* HEADER */}
        <header className="mb-10">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Dashboard Utama
          </h1>
          <p className="text-slate-500 font-medium">
            Ringkasan aktivitas Puncak Mas hari ini.
          </p>
        </header>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 text-6xl opacity-10">📝</div>
            <p className="text-xs font-black uppercase text-slate-400 mb-1">
              Total Transaksi
            </p>
            <h2 className="text-4xl font-black">{totalTransaksi}</h2>
          </div>

          <div className="bg-blue-600 p-6 rounded-[2rem] shadow-xl text-white relative overflow-hidden">
            <div className="absolute -right-4 -top-4 text-6xl opacity-20">💰</div>
            <p className="text-xs font-black uppercase text-blue-200 mb-1">
              Total Pemasukan
            </p>
            <h2 className="text-3xl font-black">
              {formatRupiah(totalPemasukan)}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 text-6xl opacity-10">👥</div>
            <p className="text-xs font-black uppercase text-slate-400 mb-1">
              Total Pengunjung
            </p>
            <h2 className="text-4xl font-black">{totalPengunjung}</h2>
          </div>

        </div>

        {/* SISTEM OPERASIONAL (CENTER) */}
        <div className="flex justify-center">
          <div className="w-full md:w-2/3 lg:w-1/2 bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden">

            <div className="relative z-10 text-center">
              <h3 className="text-xl font-black mb-2">
                Sistem Operasional
              </h3>
              <p className="text-slate-400 text-sm mb-6">
                Server Backend NestJS dalam kondisi prima.
              </p>

              <div className="space-y-4">
                <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
                  <span className="text-sm font-bold text-slate-400">
                    Database Connection
                  </span>
                  <span className="text-green-400 font-black text-xs">
                    ONLINE
                  </span>
                </div>

                <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
                  <span className="text-sm font-bold text-slate-400">
                    Security Guard
                  </span>
                  <span className="text-blue-400 font-black text-xs">
                    ENCRYPTED
                  </span>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          </div>
        </div>

      </div>
    </div>
  );
}