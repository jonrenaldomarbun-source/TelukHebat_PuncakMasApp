"use client";
import { useState, useEffect } from "react";

type PengunjungType = {
  id: number;
  jumlah: number;
  tanggal: string;
};

export default function Pengunjung() {
  const [data, setData] = useState<PengunjungType[]>([]);
  const [jumlah, setJumlah] = useState(0);
  const [loading, setLoading] = useState(false);

  // --- STATE TOKEN BIAR TEMBUS GUARD ---
  const [token, setToken] = useState("");

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

  const handleSubmit = async () => {
    if (jumlah <= 0) return alert("Masukkan jumlah pengunjung!");
    if (!token) return alert("Masukkan Kode Otorisasi Admin!");

    const payload = {
      Nama: "Pengunjung Harian",
      Jumlah: jumlah,
      Harga: 0,
      Tanggal: new Date().toISOString().split('T')[0],
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // <--- Kirim Token ke NestJS
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        fetchData();
        setJumlah(0);
      } else {
        const errorRes = await res.json();
        alert(`Gagal Simpan: ${errorRes.message || "Akses Ditolak!"}`);
      }
    } catch (error) {
      alert("Gagal simpan!");
    }
  };

  const totalPengunjung = data.reduce((sum, item) => sum + item.jumlah, 0);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-8">👥 Data Pengunjung</h1>

        {/* INPUT TOKEN CMS (SAMA DENGAN HALAMAN TRANSAKSI) */}
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="text-xl">🔑</div>
          <div className="flex-1">
            <label className="text-[10px] font-black uppercase text-amber-600 tracking-widest block">Admin Authorization Code</label>
            <input
              type="password"
              placeholder="Masukkan kode akses..."
              className="w-full bg-transparent border-b border-amber-200 outline-none focus:border-amber-500 transition-all font-mono py-1"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-center">
            <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Input Pengunjung Harian</label>
            <div className="flex gap-3">
              <input
                type="number"
                className="flex-1 bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-mono"
                value={jumlah}
                onChange={(e) => setJumlah(Number(e.target.value))}
              />
              <button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-100 transition-all active:scale-95"
              >
                Simpan
              </button>
            </div>
          </div>

          <div className="bg-green-500 p-6 rounded-2xl shadow-lg shadow-green-100 text-white flex flex-col justify-center">
            <p className="text-green-100 text-xs font-bold uppercase">Total Pengunjung</p>
            <p className="text-4xl font-black">{totalPengunjung} <span className="text-lg font-normal">Orang</span></p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
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
                  <td className="p-4 text-center font-bold text-slate-800">{item.jumlah}</td>
                  <td className="p-4 text-right">
                    <span className="bg-green-100 text-green-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase">Recorded</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}