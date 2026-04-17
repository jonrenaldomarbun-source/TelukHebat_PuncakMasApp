import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Puncak Mas - Admin CMS",
  description: "Sistem Manajemen Wisata Puncak Mas Lampung",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="bg-[#f8fafc] min-h-screen">
        {/* NAVBAR MODERN */}
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">

              {/* LOGO */}
              <div className="flex items-center gap-2">
                <div className="bg-blue-600 p-2 rounded-xl">
                  <span className="text-white text-xl">🏔️</span>
                </div>
                <h1 className="text-xl font-black text-slate-900 tracking-tighter">
                  PuncakMas <span className="text-blue-600">CMS</span>
                </h1>
              </div>

              {/* NAVIGATION LINKS */}
              <div className="hidden md:flex items-center gap-2">
                <NavLink href="/">Home</NavLink>
                <NavLink href="/dashboard">Dashboard</NavLink>
                <NavLink href="/detail_wisata">Wisata</NavLink>
                <NavLink href="/transaksi">Transaksi</NavLink>
                <NavLink href="/pengunjung">Pengunjung</NavLink>
              </div>

              {/* USER PROFILE MOCKUP */}
              <div className="flex items-center gap-3 border-l pl-6 border-slate-200">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-black text-slate-900 leading-none">Admin Utama</p>
                  <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Online</p>
                </div>
                <div className="w-10 h-10 bg-slate-200 rounded-full border-2 border-white shadow-sm overflow-hidden">
                  <img src="https://ui-avatars.com/api/?name=Admin+Puncak&background=0D8ABC&color=fff" alt="avatar" />
                </div>
              </div>

            </div>
          </div>
        </nav>

        {/* CONTENT AREA */}
        <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {children}
        </main>

        {/* FOOTER SEDERHANA */}
        <footer className="py-8 text-center text-slate-400 text-xs font-medium border-t border-slate-100 mt-12">
          &copy; {new Date().getFullYear()} Puncak Mas Lampung - Backend by NestJS.
        </footer>
      </body>
    </html>
  );
}

// Komponen Pembantu untuk Link agar lebih rapi
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-4 py-2 rounded-xl text-sm font-bold text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
    >
      {children}
    </Link>
  );
}