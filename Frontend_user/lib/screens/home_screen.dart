import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:intl/intl.dart';
import 'package:latlong2/latlong.dart';
import 'package:url_launcher/url_launcher.dart';
import '../models/wisata.dart';
import '../services/wisata_service.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    final pages = [
      HomeTab(onOpenTiket: () => setState(() => _currentIndex = 1)),
      TiketTab(onSuccessBuy: () => setState(() => _currentIndex = 2)),
      const TransaksiTab(),
      AkunTab(
        onLogout: () {
          setState(() => _currentIndex = 0);
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Logout berhasil.')),
          );
        },
      ),
    ];

    return Scaffold(
      body: IndexedStack(index: _currentIndex, children: pages),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _currentIndex,
        onDestinationSelected: (index) => setState(() => _currentIndex = index),
        destinations: const [
          NavigationDestination(icon: Icon(Icons.home_rounded), label: 'Home'),
          NavigationDestination(
            icon: Icon(Icons.confirmation_number_rounded),
            label: 'Tiket',
          ),
          NavigationDestination(
            icon: Icon(Icons.receipt_long_rounded),
            label: 'Transaksi',
          ),
          NavigationDestination(icon: Icon(Icons.people_rounded), label: 'Akun'),
        ],
      ),
    );
  }
}

class HomeTab extends StatelessWidget {
  const HomeTab({super.key, required this.onOpenTiket});

  final VoidCallback onOpenTiket;

  @override
  Widget build(BuildContext context) {
    const fasilitas = [
      'Spot Foto Instagramable',
      'Area Parkir Luas',
      'Kafe & Restoran',
      'Toilet Bersih',
      'Gazebo Istirahat',
      'Mushola',
    ];

    const mapsLink = 'https://maps.app.goo.gl/tEzNYKvrf673fsiy9';
    const puncakMasPoint = LatLng(-5.395, 105.325);

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('Home'),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Color(0xFF1E6B3C), Color(0xFF2D9B57)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(20),
            ),
            child: const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Puncak Mas',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 30,
                    fontWeight: FontWeight.w900,
                  ),
                ),
                SizedBox(height: 6),
                Text(
                  'Bandar Lampung, Lampung',
                  style: TextStyle(color: Colors.white70, fontSize: 14),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),
          _CardSection(
            title: 'Tentang Wisata',
            child: const Text(
              'Puncak Mas merupakan destinasi wisata ikonik di atas perbukitan Kota Bandar Lampung. Menawarkan kombinasi udara sejuk dan panorama perkotaan dari ketinggian. Tempat ini menjadi favorit keluarga untuk menikmati sunset dan keindahan lampu kota di malam hari.',
              style: TextStyle(height: 1.6, color: Color(0xFF334155)),
            ),
          ),
          const SizedBox(height: 14),
          _CardSection(
            title: 'Fasilitas Utama',
            child: Wrap(
              spacing: 8,
              runSpacing: 8,
              children: fasilitas
                  .map(
                    (item) => Chip(
                      label: Text(item),
                      backgroundColor: const Color(0xFFE8F5EE),
                    ),
                  )
                  .toList(),
            ),
          ),
          const SizedBox(height: 14),
          _CardSection(
            title: 'Maps Lokasi',
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                ClipRRect(
                  borderRadius: BorderRadius.circular(12),
                  child: SizedBox(
                    height: 200,
                    child: FlutterMap(
                      options: const MapOptions(
                        initialCenter: puncakMasPoint,
                        initialZoom: 15.5,
                      ),
                      children: [
                        TileLayer(
                          urlTemplate:
                              'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                          userAgentPackageName: 'com.puncakmas.app',
                        ),
                        const MarkerLayer(
                          markers: [
                            Marker(
                              point: puncakMasPoint,
                              width: 40,
                              height: 40,
                              child: Icon(
                                Icons.location_on_rounded,
                                color: Colors.red,
                                size: 36,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 8),
                const Text(
                  'Puncak Mas - Bandar Lampung',
                  style: TextStyle(fontWeight: FontWeight.w700),
                ),
                const Text(
                  'Jl. PB. Marga, Sukadana Ham, Kota Bandar Lampung',
                  style: TextStyle(color: Colors.black54),
                ),
                const SizedBox(height: 10),
                ElevatedButton.icon(
                  onPressed: () => _openMapsLink(context, mapsLink),
                  icon: const Icon(Icons.map_rounded),
                  label: const Text('Buka Maps'),
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),
          FilledButton.icon(
            onPressed: onOpenTiket,
            icon: const Icon(Icons.confirmation_number_rounded),
            label: const Text('Lanjut ke Tiket'),
          ),
        ],
      ),
    );
  }

  Future<void> _openMapsLink(BuildContext context, String mapsLink) async {
    final uri = Uri.parse(mapsLink);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
      return;
    }

    if (!context.mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Gagal membuka link maps.')),
    );
  }
}

class TiketTab extends StatefulWidget {
  const TiketTab({super.key, required this.onSuccessBuy});

  final VoidCallback onSuccessBuy;

  @override
  State<TiketTab> createState() => _TiketTabState();
}

class _TiketTabState extends State<TiketTab> {
  final WisataService _service = WisataService();
  final TextEditingController _namaController = TextEditingController();
  final TextEditingController _jumlahController = TextEditingController(text: '1');
  bool _loading = false;
  int _harga = 20000;

  @override
  void dispose() {
    _namaController.dispose();
    _jumlahController.dispose();
    super.dispose();
  }

  Future<void> _beliSekarang() async {
    final nama = _namaController.text.trim();
    final jumlah = int.tryParse(_jumlahController.text.trim()) ?? 0;
    if (nama.isEmpty || jumlah < 1) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Isi nama dan jumlah tiket dengan benar.')),
      );
      return;
    }

    setState(() => _loading = true);
    try {
      await _service.createTransaksi(
        nama: nama,
        jumlah: jumlah,
        harga: _harga,
        tanggal: DateFormat('yyyy-MM-dd').format(DateTime.now()),
      );
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Pembelian tiket berhasil.')),
      );
      _namaController.clear();
      _jumlahController.text = '1';
      widget.onSuccessBuy();
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Gagal beli tiket: $e')),
      );
    } finally {
      if (mounted) {
        setState(() => _loading = false);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final totalPreview = (_harga * (int.tryParse(_jumlahController.text) ?? 1));
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(title: const Text('Tiket')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          _CardSection(
            title: 'Informasi Tiket',
            child: Column(
              children: [
                _priceRow('Senin - Jumat', 'Rp 20.000'),
                const Divider(),
                _priceRow('Sabtu - Minggu', 'Rp 25.000'),
              ],
            ),
          ),
          const SizedBox(height: 14),
          _CardSection(
            title: 'Form Pembelian',
            child: Column(
              children: [
                TextField(
                  controller: _namaController,
                  decoration: const InputDecoration(
                    labelText: 'Nama Pengunjung',
                    border: OutlineInputBorder(),
                  ),
                ),
                const SizedBox(height: 10),
                TextField(
                  controller: _jumlahController,
                  keyboardType: TextInputType.number,
                  decoration: const InputDecoration(
                    labelText: 'Jumlah Tiket',
                    border: OutlineInputBorder(),
                  ),
                  onChanged: (_) => setState(() {}),
                ),
                const SizedBox(height: 10),
                DropdownButtonFormField<int>(
                  value: _harga,
                  items: const [
                    DropdownMenuItem(value: 20000, child: Text('Weekday - Rp 20.000')),
                    DropdownMenuItem(value: 25000, child: Text('Weekend - Rp 25.000')),
                  ],
                  onChanged: (value) => setState(() => _harga = value ?? 20000),
                  decoration: const InputDecoration(
                    labelText: 'Pilih Harga Tiket',
                    border: OutlineInputBorder(),
                  ),
                ),
                const SizedBox(height: 12),
                Align(
                  alignment: Alignment.centerLeft,
                  child: Text(
                    'Estimasi total: ${NumberFormat.currency(locale: 'id_ID', symbol: 'Rp ', decimalDigits: 0).format(totalPreview)}',
                    style: const TextStyle(fontWeight: FontWeight.w700),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),
          ElevatedButton.icon(
            onPressed: _loading ? null : _beliSekarang,
            icon: _loading
                ? const SizedBox(
                    width: 18,
                    height: 18,
                    child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white),
                  )
                : const Icon(Icons.shopping_cart_checkout_rounded),
            label: Text(_loading ? 'Memproses...' : 'Beli Sekarang'),
          ),
        ],
      ),
    );
  }

  Widget _priceRow(String label, String value) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(label, style: const TextStyle(color: Colors.black54)),
        Text(value, style: const TextStyle(fontWeight: FontWeight.w800)),
      ],
    );
  }
}

class TransaksiTab extends StatefulWidget {
  const TransaksiTab({super.key});

  @override
  State<TransaksiTab> createState() => _TransaksiTabState();
}

class _TransaksiTabState extends State<TransaksiTab> {
  final WisataService _service = WisataService();
  late Future<List<Wisata>> _future;

  @override
  void initState() {
    super.initState();
    _future = _service.fetchAllWisata();
  }

  void _refresh() {
    setState(() => _future = _service.fetchAllWisata());
  }

  Future<void> _delete(int id) async {
    await _service.deleteTransaksi(id);
    _refresh();
  }

  String _formatDate(String value) {
    try {
      return DateFormat('dd MMM yyyy', 'id_ID').format(DateTime.parse(value));
    } catch (_) {
      return value;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('Transaksi'),
        actions: [
          IconButton(onPressed: _refresh, icon: const Icon(Icons.refresh_rounded)),
        ],
      ),
      body: FutureBuilder<List<Wisata>>(
        future: _future,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }
          if (snapshot.hasError) {
            return Center(
              child: Padding(
                padding: const EdgeInsets.all(20),
                child: Text(
                  'Gagal memuat histori: ${snapshot.error}',
                  textAlign: TextAlign.center,
                ),
              ),
            );
          }
          final data = snapshot.data ?? [];
          if (data.isEmpty) {
            return const Center(child: Text('Belum ada histori pembelian tiket.'));
          }

          return ListView.separated(
            padding: const EdgeInsets.all(16),
            itemCount: data.length,
            separatorBuilder: (_, __) => const SizedBox(height: 10),
            itemBuilder: (context, index) {
              final item = data[index];
              return Container(
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(14),
                ),
                child: Row(
                  children: [
                    CircleAvatar(
                      backgroundColor: const Color(0xFFE8F5EE),
                      child: Text('#${item.id}'),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            item.nama,
                            style: const TextStyle(fontWeight: FontWeight.w800),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            '${_formatDate(item.tanggal)} • ${item.jumlah} tiket',
                            style: const TextStyle(color: Colors.black54),
                          ),
                        ],
                      ),
                    ),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        Text(
                          NumberFormat.currency(
                            locale: 'id_ID',
                            symbol: 'Rp ',
                            decimalDigits: 0,
                          ).format(item.total),
                          style: const TextStyle(
                            color: Color(0xFF1E6B3C),
                            fontWeight: FontWeight.w800,
                          ),
                        ),
                        IconButton(
                          onPressed: () => _delete(item.id),
                          icon: const Icon(
                            Icons.delete_outline_rounded,
                            color: Colors.redAccent,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              );
            },
          );
        },
      ),
    );
  }
}

class AkunTab extends StatelessWidget {
  const AkunTab({super.key, required this.onLogout});

  final VoidCallback onLogout;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(title: const Text('Akun')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(16),
            ),
            child: const Column(
              children: [
                CircleAvatar(
                  radius: 36,
                  child: Icon(Icons.person_rounded, size: 40),
                ),
                SizedBox(height: 12),
                Text(
                  'Pengunjung Puncak Mas',
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800),
                ),
                SizedBox(height: 4),
                Text('guest@puncakmas.app', style: TextStyle(color: Colors.black54)),
              ],
            ),
          ),
          const SizedBox(height: 16),
          ElevatedButton.icon(
            onPressed: onLogout,
            style: ElevatedButton.styleFrom(backgroundColor: Colors.redAccent),
            icon: const Icon(Icons.logout_rounded),
            label: const Text('Logout'),
          ),
        ],
      ),
    );
  }
}

class _CardSection extends StatelessWidget {
  const _CardSection({required this.title, required this.child});

  final String title;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w800,
              color: Color(0xFF1A2D23),
            ),
          ),
          const SizedBox(height: 10),
          child,
        ],
      ),
    );
  }
}
