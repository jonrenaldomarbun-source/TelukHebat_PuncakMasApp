"use client";
import { useEffect, useState } from "react";

type TransaksiType = {
  total: number;
};

export default function Dashboard() {
  const [totalTransaksi, setTotalTransaksi] = useState(0);
  const [totalPemasukan, setTotalPemasukan] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("transaksi");

    if (stored) {
      const data: TransaksiType[] = JSON.parse(stored);

      setTotalTransaksi(data.length);

      const total = data.reduce((sum, item) => sum + item.total, 0);
      setTotalPemasukan(total);
    }
  }, []);

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(angka);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">

        <div className="bg-white p-4 rounded shadow">
          <p>Total Transaksi</p>
          <h2 className="text-xl font-bold">{totalTransaksi}</h2>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p>Total Pemasukan</p>
          <h2 className="text-xl font-bold">
            {formatRupiah(totalPemasukan)}
          </h2>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p>Status</p>
          <h2 className="text-xl font-bold text-green-500">
            Aktif
          </h2>
        </div>

      </div>
    </div>
  );
}