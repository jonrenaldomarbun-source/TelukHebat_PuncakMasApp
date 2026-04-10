"use client";
import { useEffect, useState } from "react";

export default function Wisata() {
  const [data, setData] = useState({
    nama: "Puncak Mas",
    lokasi: "Lampung",
    deskripsi:
      "Puncak Mas merupakan salah satu destinasi wisata populer di Lampung yang menawarkan pemandangan alam yang indah, udara sejuk, serta berbagai spot foto menarik.",
    gambar:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    fasilitas: [
      "Spot Foto",

    ],
  });

  // kalau mau ambil dari localStorage
  useEffect(() => {
    const stored = localStorage.getItem("wisata");
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="space-y-6">

      {/* HERO */}
      <div className="bg-white rounded shadow overflow-hidden">
        <img
          src={data.gambar}
          alt="wisata"
          className="w-full h-64 object-cover"
        />

        <div className="p-4">
          <h1 className="text-2xl font-bold">{data.nama}</h1>
          <p className="text-gray-500">{data.lokasi}</p>
        </div>
      </div>

      {/* DESKRIPSI */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Deskripsi</h2>
        <p className="text-gray-700">{data.deskripsi}</p>
      </div>

      {/* FASILITAS */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Fasilitas</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {data.fasilitas.map((item, index) => (
            <div
              key={index}
              className="bg-blue-100 text-center p-3 rounded"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}