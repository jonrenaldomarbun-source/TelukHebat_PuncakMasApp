// lib/screens/home_screen.dart
// Layar utama: menampilkan daftar semua data wisata/tiket dari API

import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../models/wisata.dart';
import '../services/wisata_service.dart';
import 'detail_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final WisataService _service = WisataService();
  late Future<List<Wisata>> _futureWisata;

  @override
  void initState() {
    super.initState();
    _futureWisata = _service.fetchAllWisata();
  }

  /// Refresh data dari API
  void _refresh() {
    setState(() {
      _futureWisata = _service.fetchAllWisata();
    });
  }

  String _formatRupiah(int angka) {
    final formatter = NumberFormat.currency(
      locale: 'id_ID',
      symbol: 'Rp ',
      decimalDigits: 0,
    );
    return formatter.format(angka);
  }

  String _formatTanggal(String tanggal) {
    try {
      final dt = DateTime.parse(tanggal);
      return DateFormat('dd MMM yyyy', 'id_ID').format(dt);
    } catch (_) {
      return tanggal;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF4F7F5),
      appBar: AppBar(
        title: const Row(
          children: [
            Icon(Icons.landscape_rounded, size: 22),
            SizedBox(width: 8),
            Text(
              'PuncakMas',
              style: TextStyle(fontWeight: FontWeight.w800, fontSize: 20),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh_rounded),
            tooltip: 'Refresh',
            onPressed: _refresh,
          ),
        ],
      ),
      body: FutureBuilder<List<Wisata>>(
        future: _futureWisata,
        builder: (context, snapshot) {
          // === Loading State ===
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  CircularProgressIndicator(color: Color(0xFF1E6B3C)),
                  SizedBox(height: 16),
                  Text('Memuat data wisata...'),
                ],
              ),
            );
          }

          // === Error State ===
          if (snapshot.hasError) {
            return Center(
              child: Padding(
                padding: const EdgeInsets.all(32.0),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Icon(Icons.wifi_off_rounded,
                        size: 64, color: Colors.grey),
                    const SizedBox(height: 16),
                    const Text(
                      'Gagal Terhubung ke Server',
                      style: TextStyle(
                          fontSize: 18, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Pastikan API NestJS sudah berjalan di port 3000.\n${snapshot.error}',
                      textAlign: TextAlign.center,
                      style: const TextStyle(color: Colors.grey, fontSize: 13),
                    ),
                    const SizedBox(height: 24),
                    ElevatedButton.icon(
                      onPressed: _refresh,
                      icon: const Icon(Icons.refresh_rounded),
                      label: const Text('Coba Lagi'),
                    ),
                  ],
                ),
              ),
            );
          }

          // === Empty State ===
          final data = snapshot.data ?? [];
          if (data.isEmpty) {
            return const Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.inbox_rounded, size: 64, color: Colors.grey),
                  SizedBox(height: 16),
                  Text('Belum ada data wisata.',
                      style: TextStyle(color: Colors.grey)),
                ],
              ),
            );
          }

          // === Hitung ringkasan statistik ===
          final totalPengunjung = data.fold<int>(
            0, (sum, item) => sum + item.jumlah);
          final totalPemasukan = data.fold<int>(
            0, (sum, item) => sum + item.total);

          // === Data Loaded State ===
          return RefreshIndicator(
            color: const Color(0xFF1E6B3C),
            onRefresh: () async => _refresh(),
            child: CustomScrollView(
              slivers: [
                // --- Banner Header ---
                SliverToBoxAdapter(
                  child: _buildHeaderBanner(
                    data.length, totalPengunjung, totalPemasukan),
                ),

                // --- Label daftar ---
                const SliverToBoxAdapter(
                  child: Padding(
                    padding: EdgeInsets.fromLTRB(16, 24, 16, 8),
                    child: Text(
                      'Daftar Tiket Masuk',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w800,
                        color: Color(0xFF1E3A2F),
                      ),
                    ),
                  ),
                ),

                // --- List kartu wisata ---
                SliverList(
                  delegate: SliverChildBuilderDelegate(
                    (context, index) {
                      final item = data[index];
                      return _buildWisataCard(context, item);
                    },
                    childCount: data.length,
                  ),
                ),
                const SliverToBoxAdapter(child: SizedBox(height: 24)),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildHeaderBanner(
      int totalTransaksi, int totalPengunjung, int totalPemasukan) {
    return Container(
      margin: const EdgeInsets.all(16),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xFF1E6B3C), Color(0xFF2D9B57)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: const Color(0xFF1E6B3C).withOpacity(0.3),
            blurRadius: 16,
            offset: const Offset(0, 6),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(Icons.confirmation_number_rounded,
                  color: Colors.white70, size: 18),
              const SizedBox(width: 8),
              Text(
                'Ringkasan Kunjungan',
                style: TextStyle(
                  color: Colors.white.withOpacity(0.8),
                  fontSize: 13,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              _buildStatItem('Transaksi', '$totalTransaksi'),
              _buildStatDivider(),
              _buildStatItem('Pengunjung', '$totalPengunjung orang'),
              _buildStatDivider(),
              _buildStatItem('Pemasukan', _formatRupiah(totalPemasukan)),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildStatItem(String label, String value) {
    return Expanded(
      child: Column(
        children: [
          Text(
            value,
            style: const TextStyle(
              color: Colors.white,
              fontSize: 16,
              fontWeight: FontWeight.w900,
            ),
            textAlign: TextAlign.center,
            overflow: TextOverflow.ellipsis,
          ),
          const SizedBox(height: 4),
          Text(
            label,
            style: TextStyle(
              color: Colors.white.withOpacity(0.65),
              fontSize: 11,
              fontWeight: FontWeight.w500,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStatDivider() {
    return Container(
      width: 1,
      height: 36,
      color: Colors.white.withOpacity(0.2),
    );
  }

  Widget _buildWisataCard(BuildContext context, Wisata item) {
    return GestureDetector(
      onTap: () {
        Navigator.of(context).push(
          MaterialPageRoute(
            builder: (_) => DetailScreen(wisata: item),
          ),
        );
      },
      child: Container(
        margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.05),
              blurRadius: 10,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Row(
          children: [
            // Avatar / ID badge
            Container(
              width: 48,
              height: 48,
              decoration: BoxDecoration(
                color: const Color(0xFF1E6B3C).withOpacity(0.1),
                shape: BoxShape.circle,
              ),
              child: Center(
                child: Text(
                  '#${item.id}',
                  style: const TextStyle(
                    color: Color(0xFF1E6B3C),
                    fontWeight: FontWeight.w800,
                    fontSize: 13,
                  ),
                ),
              ),
            ),
            const SizedBox(width: 14),
            // Info tengah
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    item.nama,
                    style: const TextStyle(
                      fontWeight: FontWeight.w700,
                      fontSize: 15,
                      color: Color(0xFF1A2D23),
                    ),
                  ),
                  const SizedBox(height: 4),
                  Row(
                    children: [
                      const Icon(Icons.calendar_today_rounded,
                          size: 12, color: Colors.grey),
                      const SizedBox(width: 4),
                      Text(
                        _formatTanggal(item.tanggal),
                        style: const TextStyle(
                          color: Colors.grey,
                          fontSize: 12,
                        ),
                      ),
                      const SizedBox(width: 12),
                      const Icon(Icons.people_rounded,
                          size: 12, color: Colors.grey),
                      const SizedBox(width: 4),
                      Text(
                        '${item.jumlah} orang',
                        style: const TextStyle(
                          color: Colors.grey,
                          fontSize: 12,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            // Total di kanan
            Column(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                Text(
                  _formatRupiah(item.total),
                  style: const TextStyle(
                    fontWeight: FontWeight.w900,
                    fontSize: 14,
                    color: Color(0xFF1E6B3C),
                  ),
                ),
                const SizedBox(height: 4),
                const Icon(Icons.chevron_right_rounded,
                    color: Colors.grey, size: 18),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
