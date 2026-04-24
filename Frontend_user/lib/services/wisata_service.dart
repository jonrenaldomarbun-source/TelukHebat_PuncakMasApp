// lib/services/wisata_service.dart
// Service layer: bertanggung jawab untuk komunikasi HTTP ke API NestJS

import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/wisata.dart';

class WisataService {
  // Ganti dengan IP mesin API jika dijalankan di emulator fisik
  // Emulator Android bawaan: gunakan 10.0.2.2
  // Perangkat fisik: gunakan IP lokal komputer, contoh: 192.168.1.x
  static const String _baseUrl = 'http://10.0.2.2:3000';

  /// Ambil semua data wisata/transaksi dari API
  /// Endpoint: GET /wisata
  Future<List<Wisata>> fetchAllWisata() async {
    final Uri url = Uri.parse('$_baseUrl/wisata');

    try {
      final response = await http
          .get(url)
          .timeout(const Duration(seconds: 10));

      if (response.statusCode == 200) {
        final List<dynamic> jsonList = jsonDecode(response.body);
        return jsonList.map((json) => Wisata.fromJson(json)).toList();
      } else {
        throw Exception(
          'Gagal memuat data. Server merespons: ${response.statusCode}',
        );
      }
    } catch (e) {
      throw Exception('Koneksi gagal: $e');
    }
  }

  /// Ambil satu data wisata berdasarkan ID
  /// Endpoint: GET /wisata/:id
  Future<Wisata> fetchWisataById(int id) async {
    final Uri url = Uri.parse('$_baseUrl/wisata/$id');

    try {
      final response = await http
          .get(url)
          .timeout(const Duration(seconds: 10));

      if (response.statusCode == 200) {
        return Wisata.fromJson(jsonDecode(response.body));
      } else if (response.statusCode == 404) {
        throw Exception('Data dengan ID $id tidak ditemukan.');
      } else {
        throw Exception('Error: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Koneksi gagal: $e');
    }
  }

  /// Buat transaksi baru
  /// Endpoint: POST /wisata
  Future<Wisata> createTransaksi({
    required String nama,
    required int jumlah,
    required int harga,
    required String tanggal,
  }) async {
    final Uri url = Uri.parse('$_baseUrl/wisata');
    final body = jsonEncode({
      'Nama': nama,
      'Jumlah': jumlah,
      'Harga': harga,
      'Tanggal': tanggal,
    });

    try {
      final response = await http
          .post(
            url,
            headers: {'Content-Type': 'application/json'},
            body: body,
          )
          .timeout(const Duration(seconds: 10));

      if (response.statusCode == 201 || response.statusCode == 200) {
        return Wisata.fromJson(jsonDecode(response.body));
      }

      throw Exception('Gagal menambah transaksi: ${response.statusCode}');
    } catch (e) {
      throw Exception('Koneksi gagal: $e');
    }
  }

  /// Hapus transaksi
  /// Endpoint: DELETE /wisata/:id
  Future<void> deleteTransaksi(int id) async {
    final Uri url = Uri.parse('$_baseUrl/wisata/$id');

    try {
      final response = await http
          .delete(url)
          .timeout(const Duration(seconds: 10));

      if (response.statusCode == 204 || response.statusCode == 200) {
        return;
      }

      throw Exception('Gagal menghapus transaksi: ${response.statusCode}');
    } catch (e) {
      throw Exception('Koneksi gagal: $e');
    }
  }
}
