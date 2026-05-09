"use client";
import { useState, useEffect } from "react";

type TransaksiType = {
  id: number;
  nama: string;
  jumlah: number;
  hargaTiket: number;
  total: number;
  tanggal: string;
};

export default function Transaksi() {
  const [data, setData] = useState<TransaksiType[]>([]);
  const [nama, setNama] = useState("");
  const [jumlah, setJumlah] = useState(1);
  const [harga, setHarga] = useState(10000);
  const [loading, setLoading] = useState(false);

  // --- STATE TOKEN BARU ---
  const [token, setToken] = useState("");

  const API_URL = "http://localhost:3000/wisata";

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL, { cache: "no-store" });
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error("Gagal ambil data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(angka);
  };

  const handleSubmit = async () => {
    if (!nama) return alert("Isi nama pengunjung!");
    if (!token) return alert("Masukkan Kode Otorisasi Admin!");

    const payload = {
      Nama: nama,
      Jumlah: jumlah,
      Harga: harga,
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
        setNama("");
        setJumlah(1);
        setHarga(10000);
      } else {
        const errorRes = await res.json();
        alert(`Gagal: ${errorRes.message || "Akses Ditolak!"}`);
      }
    } catch (error) {
      alert("Koneksi gagal!");
    }
  };

  const handleDelete = async (id: number) => {
    if (!token) return alert("Masukkan Kode Otorisasi Admin untuk menghapus!");
    if (!confirm("Hapus transaksi ini?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}` // <--- Kirim Token ke NestJS
        }
      });

      if (res.ok) {
        fetchData();
      } else {
        const errorRes = await res.json();
        alert(`Gagal Hapus: ${errorRes.message || "Akses Ditolak!"}`);
      }
    } catch (error) {
      console.error("Gagal hapus:", error);
    }
  };

  const totalSemua = data.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto">

        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              📊 Manajemen Transaksi
            </h1>
            <p className="text-slate-500 mt-1">Sistem Terkunci Guard (Ketik 'Admin123' untuk akses)</p>
          </div>
          <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full text-green-600 font-bold text-xl">💰</div>
            <div>
              <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Total Pemasukan</p>
              <p className="text-xl font-black text-slate-800 tracking-tight">{formatRupiah(totalSemua)}</p>
            </div>
          </div>
        </div>

        {/* TOKEN INPUT CARD */}
        <div className="mb-8 bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="text-2xl">🔑</div>
          <div className="flex-1">
            <label className="text-[10px] font-black uppercase text-amber-600 tracking-widest block">Admin Authorization Code</label>
            <input
              type="password"
              placeholder="Masukkan kode untuk Simpan/Hapus..."
              className="w-full bg-transparent border-b border-amber-200 outline-none focus:border-amber-500 transition-all font-mono py-1"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* FORM INPUT */}
          <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-8">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="bg-blue-600 text-white p-1 rounded-md text-sm leading-none">＋</span>
                Input Transaksi
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-1 block uppercase">Nama Pengunjung</label>
                  <input
                    className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                    type="text"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 mb-1 block uppercase">Jumlah</label>
                    <input
                      className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none font-mono"
                      type="number"
                      value={jumlah}
                      onChange={(e) => setJumlah(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 mb-1 block uppercase">Harga</label>
                    <input
                      className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none font-mono text-sm"
                      type="number"
                      value={harga}
                      onChange={(e) => setHarga(Number(e.target.value))}
                    />
                  </div>
                </div>
                <button
                  onClick={handleSubmit}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95"
                >
                  Simpan Transaksi
                </button>
              </div>
            </div>
          </div>

          {/* TABLE */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 text-[10px] uppercase font-black tracking-widest border-b">
                    <th className="p-4">Tanggal</th>
                    <th className="p-4">Pengunjung</th>
                    <th className="p-4">Qty</th>
                    <th className="p-4 text-right">Total</th>
                    <th className="p-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.length > 0 ? (
                    data.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4 text-xs font-mono text-slate-400">{item.tanggal}</td>
                        <td className="p-4 font-bold text-slate-700">{item.nama}</td>
                        <td className="p-4 text-slate-500">{item.jumlah}x</td>
                        <td className="p-4 text-right font-black text-blue-600">{formatRupiah(item.total)}</td>
                        <td className="p-4 text-center">
                          <button onClick={() => handleDelete(item.id)} className="hover:scale-125 transition-transform">🗑️</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan={5} className="p-12 text-center opacity-20 font-bold italic">Belum ada data...</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}