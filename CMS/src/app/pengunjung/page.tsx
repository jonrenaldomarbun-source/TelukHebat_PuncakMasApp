"use client";
import { useState, useEffect } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

type PengunjungType = {
  id: number;
  jumlah: number;
  total:number;
  tanggal: string;
};

export default function Pengunjung() {
  const [data, setData] = useState<PengunjungType[]>([]);
  const [loading, setLoading] = useState(false);
  const [tanggalAwal, setTanggalAwal] = useState("");
  const [tanggalAkhir, setTanggalAkhir] = useState("");

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

  const filteredData = data.filter((item) => {
    const tanggalData = new Date(item.tanggal);
    const awal = tanggalAwal ? new Date(tanggalAwal) : null;
    const akhir = tanggalAkhir ? new Date(tanggalAkhir) : null;

    if (awal && tanggalData < awal) return false;
    if (akhir && tanggalData > akhir) return false;

    return true;
  });

const totalPengunjung = filteredData.reduce(
  (sum, item) => sum + item.jumlah,
  0
);

//Chart Data
const chartData = {
  labels: filteredData.map((item) =>
    new Date(item.tanggal).toLocaleDateString("id-ID")
  ),
  datasets: [
    {
      label: "Jumlah Pengunjung",
      data: filteredData.map((item) => item.jumlah),
    },
  ],
};

const totalPemasukan = filteredData.reduce(
  (sum, item) => sum + (item.total || 0),
  0
);


const formatRupiah = (angka: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(angka);
};
  return (
    <div className="min-h-screen bg-[#f8fafc] p-8 font-sans">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">
          👥 Data Pengunjung
        </h1>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex flex-wrap gap-3 print:hidden">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">
                Dari
              </label>
              <input
                type="date"
                value={tanggalAwal}
                onChange={(e) => setTanggalAwal(e.target.value)}
                className="border border-slate-300 px-4 py-2 rounded-xl bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">
                Sampai
              </label>
              <input
                type="date"
                value={tanggalAkhir}
                onChange={(e) => setTanggalAkhir(e.target.value)}
                className="border border-slate-300 px-4 py-2 rounded-xl bg-white"
              />
            </div>
          </div>

          <button
            onClick={() => window.print()}
            className="bg-blue-600 text-white px-5 py-2 rounded-xl font-bold hover:bg-blue-700 print:hidden"
          >
            🖨️ Cetak Laporan
          </button>
        </div>

        {/* TABEL + TOTAL */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 print:block">

          {/* TABEL */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-[420px] flex flex-col print:h-auto">
            {loading ? (
              <p className="p-6 text-center text-slate-400">Loading...</p>
            ) : (
              <div className="overflow-y-auto h-[420px] print:h-auto print:overflow-visible">
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
          <div className="flex flex-col gap-6 print:w-full">

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm print:mt-6">
              <p className="text-xs uppercase font-bold text-slate-500 mb-2">
                Ringkasan Laporan
              </p>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Pengunjung</span>
                  <span className="font-bold">
                    {totalPengunjung} Orang
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Total Pemasukan</span>
                  <span className="font-bold text-green-600">
                    {formatRupiah(totalPemasukan)}
                  </span>
                </div>
              </div>
            </div>
            
            {/* GRAFIK */}
            {/* GRAFIK */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center print:hidden">
              <h3 className="text-lg font-black mb-4">
                Grafik Mingguan
              </h3>

              <div className="h-64">
                <Bar
                  data={chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                  }}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}