"use client";
import { useEffect, useState } from "react";

export default function Wisata() {
  const [data, setData] = useState({
    nama: "Puncak Mas",
    lokasi: "Bandar Lampung, Lampung",
    deskripsi:
      "Puncak Mas merupakan destinasi wisata ikonik di atas perbukitan Kota Bandar Lampung. Menawarkan kombinasi sempurna antara udara sejuk pegunungan dan panorama perkotaan dari ketinggian. Tempat ini menjadi favorit keluarga untuk menikmati sunset dan keindahan lampu kota di malam hari.",
    gambar:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1000",
    fasilitas: [
      "🎡 Spot Foto Instagramable",
      "🚗 Area Parkir Luas",
      "☕ Kafe & Restoran",
      "🚻 Toilet Bersih",
      "🏡 Gazebo Istirahat",
      "🕌 Mushola",
    ],
  });

  useEffect(() => {
    const stored = localStorage.getItem("detail_wisata");
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-12 font-sans text-slate-800">
      {/* HERO SECTION WITH OVERLAY */}
      <div className="relative h-[400px] w-full overflow-hidden shadow-2xl">
        <img
          src={data.gambar}
          alt="wisata"
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 md:p-12">
          <div className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full w-fit mb-3">
            Destinasi Populer
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
            {data.nama}
          </h1>
          <p className="text-blue-100 flex items-center gap-2 mt-2">
            📍 {data.lokasi}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT: DESKRIPSI (2 Columns) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-1 bg-blue-600 rounded-full" />
                Tentang Wisata
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg italic">
                "{data.deskripsi}"
              </p>
            </div>

            {/* FASILITAS GRID */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-black text-slate-900 mb-6">Fasilitas Utama</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.fasilitas.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-white hover:shadow-md transition-all group"
                  >
                    <span className="text-slate-700 font-semibold group-hover:text-blue-600">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: SIDEBAR INFO */}
          <div className="lg:col-span-1">
            <div className="bg-blue-600 p-8 rounded-3xl shadow-xl shadow-blue-200 text-white sticky top-8">
              <h3 className="text-xl font-bold mb-4">Informasi Tiket</h3>
              <div className="space-y-4 text-blue-50">
                <div className="flex justify-between border-b border-blue-500 pb-2">
                  <span>Senin - Jumat</span>
                  <span className="font-bold">Rp 20.000</span>
                </div>
                <div className="flex justify-between border-b border-blue-500 pb-2">
                  <span>Sabtu - Minggu</span>
                  <span className="font-bold">Rp 25.000</span>
                </div>
                <div className="pt-4 italic text-sm opacity-80">
                  *Harga dapat berubah sewaktu-waktu sesuai kebijakan pengelola Puncak Mas.
                </div>
              </div>
              <button className="w-full bg-white text-blue-600 font-black py-4 rounded-2xl mt-8 hover:bg-blue-50 transition-colors">
                Beli Tiket Sekarang
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}