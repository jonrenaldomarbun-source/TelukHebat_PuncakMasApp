// lib/services/wisata_service.dart

import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import '../models/wisata.dart';

class WisataService {
  /// Base URL dinamis sesuai platform
  static String get _baseUrl {
    if (kIsWeb) {
      return 'http://localhost:3000';
    } else {
      return 'http://10.0.2.2:3000'; // Android Emulator
    }
  }

  /// ===============================
  /// GET: Ambil semua data wisata
  /// ===============================
  Future<List<Wisata>> fetchAllWisata() async {
    final Uri url = Uri.parse('$_baseUrl/wisata');

    try {
      final response = await http.get(url).timeout(const Duration(seconds: 10));

      if (response.statusCode == 200) {
        final List<dynamic> jsonList = jsonDecode(response.body);
        return jsonList.map((json) => Wisata.fromJson(json)).toList();
      } else {
        throw Exception(
          'Gagal memuat data. Status: ${response.statusCode}, Body: ${response.body}',
        );
      }
    } catch (e) {
      throw Exception('Koneksi gagal (fetchAllWisata): $e');
    }
  }

  /// ===============================
  /// GET: Ambil data by ID
  /// ===============================
  Future<Wisata> fetchWisataById(int id) async {
    final Uri url = Uri.parse('$_baseUrl/wisata/$id');

    try {
      final response = await http.get(url).timeout(const Duration(seconds: 10));

      if (response.statusCode == 200) {
        return Wisata.fromJson(jsonDecode(response.body));
      } else if (response.statusCode == 404) {
        throw Exception('Data dengan ID $id tidak ditemukan');
      } else {
        throw Exception(
          'Error: ${response.statusCode}, Body: ${response.body}',
        );
      }
    } catch (e) {
      throw Exception('Koneksi gagal (fetchById): $e');
    }
  }

  /// ===============================
  /// POST: Buat transaksi
  /// ===============================
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
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Admin123',
            },
            body: body,
          )
          .timeout(const Duration(seconds: 10));

      if (response.statusCode == 201 || response.statusCode == 200) {
        return Wisata.fromJson(jsonDecode(response.body));
      } else {
        throw Exception(
          'Gagal tambah transaksi. Status: ${response.statusCode}, Body: ${response.body}',
        );
      }
    } catch (e) {
      throw Exception('Koneksi gagal (createTransaksi): $e');
    }
  }

  /// ===============================
  /// DELETE: Hapus transaksi
  /// ===============================
  Future<void> deleteTransaksi(int id) async {
    final Uri url = Uri.parse('$_baseUrl/wisata/$id');

    try {
      final response = await http.delete(
        url,
        headers: {
          'Authorization': 'Admin123',
        },
      ).timeout(const Duration(seconds: 10));

      if (response.statusCode == 200 || response.statusCode == 204) {
        return;
      } else {
        throw Exception(
          'Gagal hapus transaksi. Status: ${response.statusCode}',
        );
      }
    } catch (e) {
      throw Exception('Koneksi gagal (deleteTransaksi): $e');
    }
  }
}
