"use client";
import { useState, useEffect } from "react";

type TransaksiType = {
  id: number;
  nama: string;
  jumlah: number;
  harga: number;
  total: number;
  tanggal: string;
};

export default function Transaksi() {
  const [data, setData] = useState<TransaksiType[]>([]);
  const [nama, setNama] = useState("");
  const [jumlah, setJumlah] = useState(1);
  const [harga, setHarga] = useState(10000);

  // ambil data dari localStorage saat pertama load
  useEffect(() => {
    const stored = localStorage.getItem("transaksi");
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  // format rupiah
  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(angka);
  };

  // tambah transaksi
  const handleSubmit = () => {
    if (!nama) return alert("Isi nama pengunjung!");

    const total = jumlah * harga;

    const newData: TransaksiType = {
      id: Date.now(),
      nama,
      jumlah,
      harga,
      total,
      tanggal: new Date().toLocaleDateString(),
    };

    const updatedData = [newData, ...data];

    setData(updatedData);
    localStorage.setItem("transaksi", JSON.stringify(updatedData));

    setNama("");
    setJumlah(1);
    setHarga(10000);
  };

  // hapus transaksi + update storage
  const handleDelete = (id: number) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
    localStorage.setItem("transaksi", JSON.stringify(updatedData));
  };

  // total semua pemasukan
  const totalSemua = data.reduce((sum, item) => sum + item.total, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manajemen Transaksi</h1>

      {/* FORM */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-semibold mb-3">Tambah Transaksi</h2>

        <div className="grid grid-cols-4 gap-3">
          <input
            className="border p-2 rounded"
            type="text"
            placeholder="Nama Pengunjung"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />

          <input
            className="border p-2 rounded"
            type="number"
            value={jumlah}
            onChange={(e) => setJumlah(Number(e.target.value))}
          />

          <input
            className="border p-2 rounded"
            type="number"
            value={harga}
            onChange={(e) => setHarga(Number(e.target.value))}
          />

          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white rounded"
          >
            Simpan
          </button>
        </div>
      </div>

      {/* TOTAL */}
      <div className="bg-green-100 p-4 rounded mb-4">
        <h2 className="font-semibold">
          Total Pemasukan: {formatRupiah(totalSemua)}
        </h2>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded shadow">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Tanggal</th>
              <th className="p-3">Nama</th>
              <th className="p-3">Jumlah</th>
              <th className="p-3">Harga</th>
              <th className="p-3">Total</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-3">{item.tanggal}</td>
                <td className="p-3">{item.nama}</td>
                <td className="p-3">{item.jumlah}</td>
                <td className="p-3">{formatRupiah(item.harga)}</td>
                <td className="p-3 font-semibold">
                  {formatRupiah(item.total)}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}