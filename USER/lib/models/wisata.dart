// lib/models/wisata.dart
// Model data yang disesuaikan dengan response dari API NestJS (GET /wisata)

class Wisata {
  final int id;
  final String tanggal;
  final String nama;
  final int jumlah;
  final int hargaTiket;
  final int total;

  Wisata({
    required this.id,
    required this.tanggal,
    required this.nama,
    required this.jumlah,
    required this.hargaTiket,
    required this.total,
  });

  /// Factory constructor: ubah JSON dari API menjadi objek Wisata
  factory Wisata.fromJson(Map<String, dynamic> json) {
    return Wisata(
      id: json['id'] as int,
      tanggal: json['tanggal'] as String,
      nama: json['nama'] as String,
      jumlah: (json['jumlah'] as num).toInt(),
      hargaTiket: (json['hargaTiket'] as num).toInt(),
      total: (json['total'] as num).toInt(),
    );
  }

  /// Ubah objek Wisata kembali ke Map (jika diperlukan)
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'tanggal': tanggal,
      'nama': nama,
      'jumlah': jumlah,
      'hargaTiket': hargaTiket,
      'total': total,
    };
  }
}
