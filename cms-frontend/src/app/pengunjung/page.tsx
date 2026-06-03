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
  const [tanggalFilter, setTanggalFilter] = useState("");

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

  const filteredData = tanggalFilter
  ? data.filter(
      (item) =>
        new Date(item.tanggal).toISOString().split("T")[0] === tanggalFilter
    )
  : data;

const totalPengunjung = filteredData.reduce(
  (sum, item) => sum + item.jumlah,
  0
);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-8 font-sans">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">
          👥 Data Pengunjung
        </h1>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">

          <input
            type="date"
            value={tanggalFilter}
            onChange={(e) => setTanggalFilter(e.target.value)}
            className="border border-slate-300 px-4 py-2 rounded-xl bg-white"
          />

          <button
            onClick={() => window.print()}
            className="bg-blue-600 text-white px-5 py-2 rounded-xl font-bold hover:bg-blue-700"
          >
            🖨️ Cetak Laporan
          </button>

        </div>

        {/* TABEL + TOTAL */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          {/* TABEL */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-[420px] flex flex-col">
            {loading ? (
              <p className="p-6 text-center text-slate-400">Loading...</p>
            ) : (
              <div className="overflow-y-auto h-[420px]">
                 <table className="w-full text-left">
                    <thead className="sticky top-0 z-10 bg-slate-50">
                      <tr className="bg-slate-50 text-slate-400 text-[10px] uppercase font-black tracking-widest border-b">
                        <th className="p-4">Tanggal</th>
                        <th className="p-4 text-center">Jumlah</th>
                        <th className="p-4 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 overflow-y-auto">
                      {filteredData.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-4">
                            <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-500">
                              {new Date(item.tanggal).toLocaleDateString("id-ID")}
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
                </div>
                )}
          </div>

          {/* TOTAL (READ ONLY) */}
          <div className="flex flex-col gap-6">

            {/* TOTAL */}
            <div className="bg-blue-500 p-6 rounded-2xl shadow-lg shadow-blue-100 text-white flex flex-col justify-center items-center text-center">
              <p className="text-blue-100 text-xs font-bold uppercase">
                Total Pengunjung
              </p>

              <p className="text-5xl font-black mt-2">
                {totalPengunjung}
              </p>

              <span className="text-sm mt-1">Orang</span>
            </div>

            {/* GRAFIK */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
              <h3 className="text-lg font-black mb-4">
                Grafik Mingguan
              </h3>

              <div className="h-40 bg-slate-50 rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-200">
                <p className="text-slate-400 text-sm font-bold italic">
                  Belum ada grafik
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}