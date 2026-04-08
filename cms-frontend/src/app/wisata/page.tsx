"use client";
import { useState } from "react";
import Link from "next/link";

type WisataType = {
  id: number;
  nama: string;
  lokasi: string;
};

export default function Wisata() {
  const [data, setData] = useState<WisataType[]>([
  { id: 1, nama: "Puncak Mas", lokasi: "Lampung" }
]);

  const [nama, setNama] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const handleSubmit = () => {
    if (!nama || !lokasi) return alert("Isi semua field!");

    if (editId !== null) {
      setData(
        data.map((item) =>
          item.id === editId ? { ...item, nama, lokasi } : item
        )
      );
      setEditId(null);
    } else {
      const newData = {
        id: Date.now(),
        nama,
        lokasi
      };
      setData([...data, newData]);
    }

    setNama("");
    setLokasi("");
  };

  const handleDelete = (id: number) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleEdit = (item: WisataType) => {
    setEditId(item.id);
    setNama(item.nama);
    setLokasi(item.lokasi);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manajemen Wisata</h1>

        <Link href="/dashboard">
          <button className="bg-gray-700 text-white px-4 py-2 rounded">
        ← Kembali
          </button>
        </Link>
      </div>
      <div>
       

        {/* FORM */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="font-semibold mb-3">
            {editId ? "Edit Data" : "Tambah Data"}
          </h2>

          <div className="flex gap-3">
            <input
              className="border p-2 rounded w-full"
              type="text"
              placeholder="Nama Wisata"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
            <input
              className="border p-2 rounded w-full"
              type="text"
              placeholder="Lokasi"
              value={lokasi}
              onChange={(e) => setLokasi(e.target.value)}
            />
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 rounded"
            >
              {editId ? "Update" : "Tambah"}
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded shadow">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3">Nama</th>
                <th className="p-3">Lokasi</th>
                <th className="p-3">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-3">{item.nama}</td>
                  <td className="p-3">{item.lokasi}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-yellow-400 px-3 py-1 rounded"
                    >
                      Edit
                    </button>

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
    </div>
  );
}