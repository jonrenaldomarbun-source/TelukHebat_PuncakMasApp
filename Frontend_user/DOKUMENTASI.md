# 📱 Dokumentasi Frontend End User — PuncakMas App
### Platform: Flutter | Role: End User | Tim: TelukHebat

---

## 📋 Daftar Isi
1. [Gambaran Umum Proyek](#1-gambaran-umum-proyek)
2. [Arsitektur Micro Service](#2-arsitektur-micro-service)
3. [Peran End User dalam Tim](#3-peran-end-user-dalam-tim)
4. [Struktur Folder Flutter](#4-struktur-folder-flutter)
5. [Penjelasan Setiap File](#5-penjelasan-setiap-file)
6. [Alur Data (Data Flow)](#6-alur-data-data-flow)
7. [Koneksi ke API NestJS](#7-koneksi-ke-api-nestjs)
8. [Cara Menjalankan Proyek](#8-cara-menjalankan-proyek)
9. [Screenshot & UI Description](#9-screenshot--ui-description)
10. [Catatan Progress & TODO](#10-catatan-progress--todo)

---

## 1. Gambaran Umum Proyek

**Nama Proyek:** PuncakMas App  
**Tim:** TelukHebat  
**Tujuan:** Membangun sistem informasi wisata berbasis Micro Service untuk tempat wisata PuncakMas, Lampung.

### Komponen dalam Ekosistem Micro Service:

| Komponen | Teknologi | Peran |
|---|---|---|
| `API` | NestJS (TypeScript) | Backend / REST API server |
| `cms-frontend` | Next.js (React) | Admin CMS — kelola data transaksi |
| `Frontend_user` ← **ini role kita** | **Flutter** | Aplikasi End User — lihat data wisata |

> **Catatan:** Folder `Frontend_user` di repo saat ini hanya berisi `front.html` kosong. Semua kode Flutter yang sebenarnya dikerjakan secara lokal dan di-push terpisah. Dokumentasi ini menjelaskan keseluruhan implementasi Flutter.

---

## 2. Arsitektur Micro Service

```
┌─────────────────────────────────────────────────────────────┐
│                    EKOSISTEM PUNCAKMAS                      │
│                                                             │
│   [Admin / CMS]              [End User]                     │
│   Next.js App                Flutter App  ← KITA           │
│       │                           │                         │
│       │  HTTP POST/PATCH/DELETE    │  HTTP GET               │
│       │  Authorization: Bearer     │  (No Auth Required)     │
│       ▼                           ▼                         │
│   ┌─────────────────────────────────────┐                   │
│   │        API NestJS — Port 3000       │                   │
│   │                                     │                   │
│   │   GET    /wisata       → semua data │                   │
│   │   GET    /wisata/:id   → satu data  │                   │
│   │   POST   /wisata       → buat baru  │                   │
│   │   PATCH  /wisata/:id   → edit       │                   │
│   │   DELETE /wisata/:id   → hapus      │                   │
│   │                                     │                   │
│   │   Guard: Authorization: Admin123    │                   │
│   │   (hanya untuk POST/PATCH/DELETE)   │                   │
│   └─────────────────────────────────────┘                   │
│                    │                                        │
│                    │ In-Memory Storage                      │
│                    │ (data dummy sementara)                 │
│                    └────────────────────                    │
└─────────────────────────────────────────────────────────────┘
```

### Mengapa End User tidak perlu Authorization?
Berdasarkan kode `wisata.guard.ts`, Guard hanya dipasang di endpoint mutasi data (`@Post`, `@Patch`, `@Delete`). Endpoint `GET /wisata` dan `GET /wisata/:id` bersifat **publik** — siapa saja bisa membacanya tanpa token.

---

## 3. Peran End User dalam Tim

Sebagai **End User**, jobdesk kita adalah:
- Membuat aplikasi mobile (Flutter) yang dapat **menampilkan data wisata** yang dikelola oleh admin via CMS.
- Aplikasi bersifat **read-only**: pengunjung hanya dapat melihat, bukan mengubah data.
- Berkomunikasi dengan API melalui endpoint `GET /wisata` dan `GET /wisata/:id`.

**Yang BUKAN menjadi tanggung jawab End User:**
- CRUD data (itu tugas Admin CMS)
- Membuat API / backend
- Mengelola database

---

## 4. Struktur Folder Flutter

```
Frontend_user/
└── puncakmas_app/                  ← Root proyek Flutter
    ├── pubspec.yaml                ← Konfigurasi dependensi
    ├── lib/
    │   ├── main.dart               ← Entry point aplikasi
    │   ├── models/
    │   │   └── wisata.dart         ← Model data (sesuai response API)
    │   ├── services/
    │   │   └── wisata_service.dart ← Layer komunikasi HTTP ke API
    │   └── screens/
    │       ├── splash_screen.dart  ← Layar pembuka (animasi logo)
    │       ├── home_screen.dart    ← Layar utama (daftar semua tiket)
    │       └── detail_screen.dart  ← Layar detail satu tiket
    └── android/
        └── app/src/main/AndroidManifest.xml  ← Perlu izin INTERNET
```

---

## 5. Penjelasan Setiap File

### `lib/main.dart`
Entry point. Mendaftarkan `MaterialApp` dengan tema warna hijau (`#1E6B3C`, warna alam pegunungan) dan mengarahkan ke `SplashScreen` sebagai halaman pertama.

### `lib/models/wisata.dart`
Mendefinisikan kelas `Wisata` yang memetakan JSON dari API ke objek Dart.

**Struktur JSON dari API (GET /wisata):**
```json
{
  "id": 1,
  "tanggal": "2026-04-17",
  "nama": "bomay",
  "jumlah": 5,
  "hargaTiket": 50000,
  "total": 250000
}
```

**Pemetaan ke Model Dart:**
```dart
class Wisata {
  final int id;
  final String tanggal;
  final String nama;
  final int jumlah;
  final int hargaTiket;
  final int total;
}
```

> **Catatan penting:** Field `nama` dari API merujuk ke Nama Pengunjung (di DTO namanya `Nama`), dan `hargaTiket` adalah harga satuan tiket per orang.

### `lib/services/wisata_service.dart`
Berisi class `WisataService` yang menggunakan package `http` untuk berkomunikasi dengan API. Terdapat dua method:

| Method | Endpoint | Deskripsi |
|---|---|---|
| `fetchAllWisata()` | `GET /wisata` | Ambil semua data transaksi |
| `fetchWisataById(id)` | `GET /wisata/:id` | Ambil satu data berdasarkan ID |

**URL Konfigurasi:**
```dart
// Untuk Android Emulator bawaan (AVD):
static const String _baseUrl = 'http://10.0.2.2:3000';

// Untuk perangkat fisik (ganti dengan IP komputer):
// static const String _baseUrl = 'http://192.168.x.x:3000';
```

### `lib/screens/splash_screen.dart`
Layar pembuka dengan animasi fade-in + scale. Secara otomatis berpindah ke `HomeScreen` setelah 2.5 detik. Menampilkan logo, nama "PuncakMas", dan tagline "Wisata Alam Lampung".

### `lib/screens/home_screen.dart`
Layar utama yang:
1. Memanggil `WisataService.fetchAllWisata()` menggunakan `FutureBuilder`.
2. Menampilkan banner ringkasan (total transaksi, pengunjung, pemasukan).
3. Menampilkan daftar kartu tiket dalam `SliverList`.
4. Menangani state: **Loading**, **Error** (koneksi gagal), dan **Empty** (belum ada data).
5. Mendukung Pull-to-Refresh (`RefreshIndicator`).

### `lib/screens/detail_screen.dart`
Layar detail yang menerima objek `Wisata` dari `HomeScreen` dan menampilkan:
- **Kartu tiket visual** bergaya seperti boarding pass (dengan garis putus-putus).
- **Rincian pembayaran** (harga per orang, jumlah orang, total).
- **Info card** berisi keterangan sumber data.

---

## 6. Alur Data (Data Flow)

```
User membuka Aplikasi
        │
        ▼
  SplashScreen (2.5 detik)
        │
        ▼
  HomeScreen
        │
        ├── initState() memanggil WisataService.fetchAllWisata()
        │
        ├── [Loading] → Tampilkan CircularProgressIndicator
        │
        ├── [Error]   → Tampilkan pesan error + tombol "Coba Lagi"
        │
        └── [Success] → Tampilkan Banner + SliverList kartu tiket
                              │
                              ▼ (user tap kartu)
                        DetailScreen(wisata: item)
                              │
                              └── Tampilkan detail tiket lengkap
```

---

## 7. Koneksi ke API NestJS

### Endpoint yang digunakan End User:

```
GET http://localhost:3000/wisata
  → Response: Array JSON semua transaksi

GET http://localhost:3000/wisata/:id
  → Response: JSON satu transaksi berdasarkan ID
```

### Tidak diperlukan Header Authorization:
Berbeda dengan CMS yang harus mengirim `Authorization: Bearer Admin123`, aplikasi End User **tidak perlu header apapun** karena Guard hanya aktif di POST/PATCH/DELETE.

### Contoh kode pemanggilan API:
```dart
final response = await http
    .get(Uri.parse('http://10.0.2.2:3000/wisata'))
    .timeout(const Duration(seconds: 10));

if (response.statusCode == 200) {
  final List<dynamic> jsonList = jsonDecode(response.body);
  return jsonList.map((json) => Wisata.fromJson(json)).toList();
}
```

---

## 8. Cara Menjalankan Proyek

### Prasyarat:
- Flutter SDK (versi ≥ 3.0.0) sudah terinstall
- Android Studio / VS Code dengan plugin Flutter
- Emulator Android atau perangkat fisik
- API NestJS sudah berjalan di `http://localhost:3000`

### Langkah-langkah:

**1. Jalankan API NestJS terlebih dahulu:**
```bash
cd API
npm install
npm run start:dev
# Server berjalan di: http://localhost:3000
```

**2. Clone/buka folder Flutter:**
```bash
cd Frontend_user/puncakmas_app
flutter pub get
```

**3. Sesuaikan URL API di `wisata_service.dart`:**
```dart
// Jika menggunakan Android Emulator (AVD):
static const String _baseUrl = 'http://10.0.2.2:3000';

// Jika menggunakan perangkat fisik:
// static const String _baseUrl = 'http://192.168.1.xxx:3000';
// (ganti dengan IP komputer yang menjalankan NestJS)
```

**4. Tambahkan izin INTERNET di `AndroidManifest.xml`:**
```xml
<!-- android/app/src/main/AndroidManifest.xml -->
<manifest ...>
    <uses-permission android:name="android.permission.INTERNET"/>
    <application
        android:usesCleartextTraffic="true"  <!-- penting untuk HTTP lokal -->
        ...>
    </application>
</manifest>
```

**5. Jalankan aplikasi:**
```bash
flutter run
```

---

## 9. Screenshot & UI Description

### Layar 1 — Splash Screen
- Background hijau gradient (`#1E6B3C`)
- Icon gunung di tengah (lingkaran transparan)
- Teks "PuncakMas" besar, bold
- Tagline "Wisata Alam Lampung"
- Loading spinner putih di bawah

### Layar 2 — Home Screen
- AppBar hijau dengan icon landscape dan nama "PuncakMas"
- **Banner hijau gradient** menampilkan ringkasan:
  - Total Transaksi (jumlah record)
  - Total Pengunjung (sum dari field `jumlah`)
  - Total Pemasukan (sum dari field `total`, format Rupiah)
- **Daftar kartu** tiket berisi:
  - Badge ID di kiri (lingkaran hijau muda)
  - Nama pengunjung (bold)
  - Tanggal dan jumlah orang (icon kecil)
  - Total harga di kanan (hijau, bold)
  - Chevron tanda bisa diklik
- Pull-to-Refresh tersedia

### Layar 3 — Detail Screen
- AppBar "Detail Tiket"
- **Kartu tiket** bergaya boarding pass (gradient hijau):
  - Header: logo PuncakMas + badge ID
  - Nama pengunjung besar
  - Tanggal kunjungan dengan icon
  - Garis putus-putus pemisah + notch kanan-kiri
  - Footer: jumlah orang dan total bayar
- **Rincian Pembayaran**: harga per orang, perhitungan, total
- **Info Card** hijau muda: keterangan sumber data API

---

## 10. Catatan Progress & TODO

### ✅ Sudah Selesai:
- [x] Model `Wisata` (sesuai response API)
- [x] Service layer (`WisataService`) untuk GET semua & GET by ID
- [x] `SplashScreen` dengan animasi
- [x] `HomeScreen` dengan FutureBuilder, loading/error/empty state, pull-to-refresh
- [x] `DetailScreen` dengan tampilan kartu tiket
- [x] Tema warna konsisten (hijau alam)
- [x] Format Rupiah dan format tanggal Indonesia
- [x] Dokumentasi lengkap

### 🔄 Masih Progress / TODO:
- [ ] Fitur pencarian berdasarkan nama pengunjung
- [ ] Filter data berdasarkan tanggal
- [ ] Halaman "Tentang Wisata PuncakMas" (informasi statis)
- [ ] Integrasi lokasi / maps
- [ ] Unit test untuk `WisataService`
- [ ] Tes di perangkat fisik

### ⚠️ Ketergantungan dengan Tim Lain:
- API harus sudah berjalan (tim API/NestJS)
- Jika API menambah field baru, model `Wisata` perlu diperbarui
- URL base API masih hardcoded (perlu env config saat produksi)

---

## Referensi

| Topik | Link |
|---|---|
| Flutter Docs | https://docs.flutter.dev |
| Package `http` | https://pub.dev/packages/http |
| Package `intl` | https://pub.dev/packages/intl |
| NestJS (API) | https://nestjs.com |

---

*Dokumentasi ini dibuat untuk keperluan tugas Micro Service — mata kuliah Pemrograman Berbasis Layanan.*  
*Tim TelukHebat — Peran: End User (Flutter)*
