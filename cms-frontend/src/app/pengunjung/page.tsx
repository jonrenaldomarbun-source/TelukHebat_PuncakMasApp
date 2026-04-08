"use client";
import { useState, useEffect } from "react";

type PengunjungType = {
  id: number;
  tanggal: string;
  jumlah: number;
};

export default function Pengunjung() {
  const [data, setData] = useState<PengunjungType[]>([]);
  const [jumlah, setJumlah] = useState(0);

  // load data dari localStorage
  useEffect(() => {
    const stored = localStorage.getItem("pengunjung");
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  // tambah data
  const handleSubmit = () => {
    if (jumlah <= 0) return alert("Masukkan jumlah pengunjung!");

    const newData: PengunjungType = {
      id: Date.now(),
      tanggal: new Date().toLocaleDateString(),
      jumlah,
    };

    const updatedData = [newData, ...data];

    setData(updatedData);
    localStorage.setItem("pengunjung", JSON.stringify(updatedData));

    setJumlah(0);
  };

  // hapus data
  const handleDelete = (id: number) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
    localStorage.setItem("pengunjung", JSON.stringify(updatedData));
  };

  // total pengunjung
  const totalPengunjung = data.reduce((sum, item) => sum + item.jumlah, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Data Pengunjung</h1>

      {/* FORM */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-semibold mb-3">Input Pengunjung Harian</h2>

        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Jumlah Pengunjung"
            value={jumlah}
            onChange={(e) => setJumlah(Number(e.target.value))}
            className="border p-2 rounded w-full"
          />

          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 rounded"
          >
            Simpan
          </button>
        </div>
      </div>

      {/* TOTAL */}
      <div className="bg-green-100 p-4 rounded mb-4">
        <h2 className="font-semibold">
          Total Pengunjung: {totalPengunjung}
        </h2>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded shadow">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Tanggal</th>
              <th className="p-3">Jumlah</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-3">{item.tanggal}</td>
                <td className="p-3">{item.jumlah}</td>
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