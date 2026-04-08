"use client";
import { useState } from "react";

type TransaksiType = {
  id: number;
  nama: string;
  jumlah: number;
  harga: number;
  total: number;
};

export default function Transaksi() {
  const [data, setData] = useState<TransaksiType[]>([]);
  const [nama, setNama] = useState("");
  const [jumlah, setJumlah] = useState(1);
  const [harga, setHarga] = useState(10000);

  const handleSubmit = () => {
    if (!nama) return alert("Isi nama wisata!");

    const total = jumlah * harga;

    const newData: TransaksiType = {
      id: Date.now(),
      nama,
      jumlah,
      harga,
      total,
    };

    setData([newData, ...data]);

    setNama("");
    setJumlah(1);
    setHarga(10000);
  };

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
            placeholder="Nama Wisata"
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

      {/* TABLE */}
      <div className="bg-white rounded shadow">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Nama</th>
              <th className="p-3">Jumlah</th>
              <th className="p-3">Harga</th>
              <th className="p-3">Total</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-3">{item.nama}</td>
                <td className="p-3">{item.jumlah}</td>
                <td className="p-3">Rp {item.harga}</td>
                <td className="p-3 font-semibold">Rp {item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}