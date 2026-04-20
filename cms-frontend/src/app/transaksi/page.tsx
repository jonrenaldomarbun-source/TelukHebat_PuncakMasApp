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

    const payload = {
      Nama: nama,
      Jumlah: jumlah,
      Harga: harga,
      Tanggal: new Date().toISOString().split("T")[0],
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
        alert(`Gagal: ${errorRes.message || "Terjadi kesalahan"}`);
      }
    } catch (error) {
      alert("Koneksi gagal!");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus transaksi ini?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchData();
      } else {
        const errorRes = await res.json();
        alert(`Gagal Hapus: ${errorRes.message || "Terjadi kesalahan"}`);
      }
    } catch (error) {
      console.error("Gagal hapus:", error);
    }
  };

  const totalSemua = data.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">
              📊 Manajemen Transaksi
            </h1>
            <p className="text-slate-500 mt-1">
              Sistem transaksi pengunjung
            </p>
          </div>

          <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full">💰</div>
            <div>
              <p className="text-xs text-slate-400 uppercase font-bold">
                Total Pemasukan
              </p>
              <p className="text-xl font-black">
                {formatRupiah(totalSemua)}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* FORM */}
          <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border sticky top-8">
              <h2 className="text-lg font-bold mb-4">
                Input Transaksi
              </h2>

              <div className="space-y-4">
                <input
                  className="w-full bg-slate-50 border p-3 rounded-xl"
                  placeholder="Nama Pengunjung"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    className="bg-slate-50 border p-3 rounded-xl"
                    type="number"
                    value={jumlah}
                    onChange={(e) => setJumlah(Number(e.target.value))}
                  />
                  <input
                    className="bg-slate-50 border p-3 rounded-xl"
                    type="number"
                    value={harga}
                    onChange={(e) => setHarga(Number(e.target.value))}
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-blue-600 text-white py-4 rounded-xl"
                >
                  Simpan Transaksi
                </button>
              </div>
            </div>
          </div>

          {/* TABLE */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 text-xs uppercase font-bold text-slate-400">
                    <th className="p-4">Tanggal</th>
                    <th className="p-4">Nama</th>
                    <th className="p-4">Qty</th>
                    <th className="p-4 text-right">Total</th>
                    <th className="p-4 text-center">Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {data.map((item) => (
                    <tr key={item.id}>
                      <td className="p-4 text-xs">{item.tanggal}</td>
                      <td className="p-4">{item.nama}</td>
                      <td className="p-4">{item.jumlah}</td>
                      <td className="p-4 text-right">
                        {formatRupiah(item.total)}
                      </td>
                      <td className="p-4 text-center">
                        <button onClick={() => handleDelete(item.id)}>
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}