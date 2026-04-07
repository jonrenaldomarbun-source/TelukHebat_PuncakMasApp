export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <p>Total Wisata</p>
          <h2 className="text-xl font-bold">10</h2>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p>Pengunjung</p>
          <h2 className="text-xl font-bold">120</h2>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p>Transaksi</p>
          <h2 className="text-xl font-bold">50</h2>
        </div>
      </div>
    </div>
  );
}