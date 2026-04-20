"use client";
import { useState, useEffect } from "react";

type PengunjungType = {
  id: number;
  jumlah: number;
  tanggal: string;
};

export default function Pengunjung() {
  const [data, setData] = useState<PengunjungType[]>([]);
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:3000/wisata";

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL, { cache: "no-store" });
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error("Gagal load data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalPengunjung = data.reduce((sum, item) => sum + item.jumlah, 0);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-8 font-sans">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">
          👥 Data Pengunjung
        </h1>

        {/* TABEL + TOTAL */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          {/* TABEL */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {loading ? (
              <p className="p-6 text-center text-slate-400">Loading...</p>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 text-[10px] uppercase font-black tracking-widest border-b">
                    <th className="p-4">Tanggal</th>
                    <th className="p-4 text-center">Jumlah</th>
                    <th className="p-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4">
                        <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-500">
                          {item.tanggal}
                        </span>
                      </td>
                      <td className="p-4 text-center font-bold text-slate-800">
                        {item.jumlah}
                      </td>
                      <td className="p-4 text-right">
                        <span className="bg-green-100 text-green-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                          Recorded
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* TOTAL (READ ONLY) */}
          <div className="bg-blue-500 p-6 rounded-2xl shadow-lg shadow-blue-100 text-white flex flex-col justify-center items-center text-center">
            <p className="text-blue-100 text-xs font-bold uppercase">
              Total Pengunjung
            </p>
            <p className="text-5xl font-black mt-2">
              {totalPengunjung}
            </p>
            <span className="text-sm mt-1">Orang</span>
          </div>
        </div>

        {/* GRAFIK */}
        <div className="flex justify-center">
          <div className="w-full md:w-2/3 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm text-center">
            <h3 className="text-xl font-black mb-4">Grafik Mingguan</h3>
            <div className="h-48 w-full bg-slate-50 rounded-3xl flex items-center justify-center border-2 border-dashed border-slate-200">
              <p className="text-slate-400 text-sm font-bold italic">
                Belum ada grafik (bisa pakai Chart.js nanti)
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}