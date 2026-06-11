# DOKUMENTASI PROJECT FRONTEND_USER

## 1. Deskripsi Project
Aplikasi wisata Puncak Mas adalah sebuah aplikasi mobile berbasis Flutter yang dirancang khusus untuk pengguna akhir (user). Aplikasi ini menyediakan informasi lengkap tentang destinasi wisata Puncak Mas, termasuk deskripsi, galeri foto, lokasi, serta fitur pembelian tiket secara online. Tujuan utama aplikasi ini adalah memberikan pengalaman wisata yang mudah dan menyenangkan bagi pengguna, dengan antarmuka yang intuitif dan responsif. Aplikasi ini memungkinkan pengguna untuk menjelajahi berbagai atraksi wisata, melihat detail informasi, serta mengelola transaksi tiket mereka melalui perangkat mobile.

## 2. Teknologi yang Digunakan
Proyek ini dibangun menggunakan teknologi berikut:
- **Flutter**: Framework utama untuk pengembangan aplikasi mobile lintas platform (Android dan iOS).
- **Dart**: Bahasa pemrograman yang digunakan dalam Flutter untuk menulis kode aplikasi.
- **HTTP Package**: Library untuk melakukan permintaan HTTP ke API eksternal guna mengambil data wisata dan transaksi.
- **Material Design**: Sistem desain dari Google yang digunakan untuk menciptakan antarmuka pengguna yang konsisten dan modern.

## 3. Struktur Folder
Struktur folder proyek ini diorganisir secara sistematis untuk memudahkan pengembangan dan pemeliharaan kode. Berikut adalah penjelasan folder penting dalam direktori `lib/`:

- **screens/**: Berisi file-file yang mendefinisikan tampilan utama aplikasi, seperti halaman home, detail wisata, dan splash screen. Setiap screen merupakan komponen utama yang menampilkan konten kepada pengguna.
- **models/**: Menyimpan kelas-kelas data model, seperti `wisata.dart`, yang merepresentasikan struktur data wisata yang diambil dari API. Model ini membantu dalam pengelolaan data secara terstruktur.
- **services/**: Berisi layanan untuk interaksi dengan API, seperti `wisata_service.dart`, yang menangani permintaan HTTP untuk mengambil atau mengirim data ke server.
- **assets/**: Folder untuk menyimpan file statis seperti gambar, ikon, atau font yang digunakan dalam aplikasi (meskipun dalam proyek ini belum sepenuhnya diimplementasikan).

Struktur ini memastikan kode tetap terorganisir, mudah dibaca, dan dapat dikembangkan oleh tim pengembang.

## 4. Fitur Aplikasi
Aplikasi ini menyediakan berbagai fitur untuk mendukung pengalaman wisata pengguna:
- **Home Wisata**: Halaman utama yang menampilkan daftar destinasi wisata Puncak Mas dengan informasi singkat.
- **Informasi Wisata**: Detail lengkap tentang suatu destinasi, termasuk deskripsi, harga tiket, dan fasilitas.
- **Galeri Wisata**: Koleksi foto destinasi wisata yang ditampilkan dalam format grid, dengan opsi untuk melihat lebih banyak gambar.
- **Pembelian Tiket**: Fitur untuk memesan tiket wisata secara online melalui antarmuka sederhana.
- **Histori Transaksi**: Riwayat pembelian tiket pengguna, yang menampilkan data transaksi sebelumnya.
- **Maps Lokasi**: Integrasi peta untuk menunjukkan lokasi destinasi wisata (meskipun implementasi peta belum sepenuhnya selesai).
- **Bottom Navigation**: Navigasi bawah untuk berpindah antara halaman utama, transaksi, dan pengunjung dengan mudah.

## 5. Penjelasan UI/UX
Desain UI/UX aplikasi ini mengutamakan kesederhanaan dan kemudahan penggunaan:
- **Clean UI**: Antarmuka yang bersih dan tidak berantakan, dengan fokus pada konten utama untuk menghindari kebingungan pengguna.
- **Responsive**: Desain yang menyesuaikan dengan berbagai ukuran layar perangkat mobile, memastikan pengalaman yang konsisten di Android dan iOS.
- **Modern Mobile Layout**: Menggunakan layout standar mobile dengan elemen seperti AppBar, BottomNavigationBar, dan Scaffold untuk navigasi yang intuitif.
- **Card-Based Design**: Informasi wisata ditampilkan dalam bentuk kartu (Card) yang mudah dibaca dan menarik secara visual.
- **Grid Galeri**: Galeri foto menggunakan GridView untuk menampilkan gambar dalam format grid yang rapi dan efisien.
- **Navigasi Sederhana**: Bottom navigation memungkinkan pengguna berpindah halaman dengan satu ketukan, tanpa perlu menu kompleks.

Konsep desain ini bertujuan untuk memberikan pengalaman pengguna yang nyaman dan efisien, sehingga pengguna dapat fokus pada eksplorasi wisata tanpa distraksi.

## 6. Penjelasan API Integration (singkat)
Aplikasi frontend ini terintegrasi dengan API backend untuk mengambil data wisata dan transaksi. Integrasi dilakukan menggunakan HTTP request melalui package `http` di Dart. Data seperti daftar wisata, detail destinasi, dan histori transaksi diambil dari endpoint API dan ditampilkan secara real-time di aplikasi. Proses ini memastikan data selalu terkini tanpa perlu penyimpanan lokal yang kompleks.

## 7. Penjelasan State Management
State management dalam aplikasi ini menggunakan pendekatan sederhana dengan StatefulWidget dan metode `setState`. StatefulWidget digunakan untuk komponen yang memerlukan perubahan state dinamis, seperti saat memuat data dari API atau memperbarui tampilan berdasarkan interaksi pengguna. Metode `setState` dipanggil untuk memberitahu framework Flutter bahwa ada perubahan state, sehingga UI dapat diperbarui secara otomatis. Pendekatan ini cocok untuk aplikasi skala kecil seperti ini, meskipun untuk pengembangan lebih lanjut dapat dipertimbangkan penggunaan state management yang lebih advanced seperti Provider atau Riverpod.

## 8. Penjelasan Galeri Wisata
Fitur galeri wisata menampilkan koleksi foto destinasi menggunakan widget GridView, yang mengatur gambar dalam format grid responsif. Awalnya, hanya 4 gambar pertama yang ditampilkan untuk menghindari loading berat. Pengguna dapat melihat lebih banyak gambar dengan menekan tombol "lihat lebih banyak", yang akan memperluas grid secara dinamis. Implementasi ini mengoptimalkan performa aplikasi dengan lazy loading dan memastikan pengalaman visual yang menarik tanpa mengorbankan kecepatan.

## 9. Penjelasan Histori Transaksi
Fitur histori transaksi menampilkan daftar transaksi tiket yang telah dilakukan oleh pengguna. Data diambil langsung dari API backend dan ditampilkan dalam format list yang mudah dibaca. Fitur delete dihilangkan dari aplikasi user karena sesuai dengan role pengguna akhir, yang tidak diperbolehkan mengubah atau menghapus data transaksi. Hal ini memastikan integritas data dan keamanan aplikasi.

## 10. Cara Menjalankan Project
Untuk menjalankan proyek ini, ikuti langkah-langkah berikut:
1. Pastikan Flutter SDK telah terinstal di sistem Anda.
2. Buka terminal dan navigasi ke direktori proyek `Frontend_user`.
3. Jalankan perintah `flutter pub get` untuk mengunduh semua dependensi yang diperlukan.
4. Jalankan perintah `flutter run` untuk menjalankan aplikasi di emulator atau perangkat fisik.
5. Pilih perangkat target (Android atau iOS) jika diminta.

Pastikan perangkat pengembangan terhubung dan API backend berjalan untuk pengalaman penuh.

## 11. Catatan Pengembangan
Proyek ini masih dalam tahap pengembangan dan memiliki potensi untuk diperluas dengan fitur-fitur tambahan, seperti:
- **Login User**: Sistem autentikasi untuk pengguna agar dapat mengakses fitur personal.
- **Pembayaran Online**: Integrasi gateway pembayaran untuk transaksi tiket yang lebih aman.
- **Admin CMS**: Panel admin untuk mengelola konten wisata dari sisi backend.
- **Notifikasi**: Push notification untuk update wisata atau konfirmasi transaksi.
- **Deploy Online**: Publikasi aplikasi ke app store untuk akses publik.

Pengembangan selanjutnya dapat fokus pada peningkatan performa, keamanan, dan fitur interaktif untuk memberikan pengalaman wisata yang lebih baik.