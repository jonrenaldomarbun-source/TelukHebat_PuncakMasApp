import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">

      {/* TITLE */}
      <h1 className="text-4xl font-bold mb-4">
        PuncakMas CMS
      </h1>

      <p className="text-gray-600 mb-8 text-center max-w-md">
        Sistem Informasi Wisata Puncak Mas yang membantu pengelolaan
        data wisata, transaksi tiket, dan pengunjung secara mudah dan cepat.
      </p>

      {/* MENU */}
      <div className="grid grid-cols-2 gap-4">

        <Link href="/dashboard">
          <div className="bg-white p-6 rounded shadow hover:shadow-lg cursor-pointer text-center">
            📊 Dashboard
          </div>
        </Link>

        <Link href="/wisata">
          <div className="bg-white p-6 rounded shadow hover:shadow-lg cursor-pointer text-center">
            🏞️ Data Wisata
          </div>
        </Link>

        <Link href="/transaksi">
          <div className="bg-white p-6 rounded shadow hover:shadow-lg cursor-pointer text-center">
            💰 Transaksi
          </div>
        </Link>

        <Link href="/pengunjung">
          <div className="bg-white p-6 rounded shadow hover:shadow-lg cursor-pointer text-center">
            👥 Pengunjung
          </div>
        </Link>

      </div>

    </div>
  );
}