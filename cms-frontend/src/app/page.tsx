import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen">

          {/* SIDEBAR */}
          <div className="w-64 bg-gray-800 text-white p-4">
            <h2 className="text-xl font-bold mb-6">PuncakMas CMS</h2>

            <ul className="space-y-2">
              <li><Link href="/dashboard">Dashboard</Link></li>
              <li><Link href="/wisata">Wisata</Link></li>
              <li><Link href="/pengunjung">Pengunjung</Link></li>
              <li><Link href="/transaksi">Transaksi</Link></li>
            </ul>
          </div>

          {/* CONTENT */}
          <div className="flex-1 p-6 bg-gray-100">
            {children}
          </div>

        </div>
      </body>
    </html>
  );
}