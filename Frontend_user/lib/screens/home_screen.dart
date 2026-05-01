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
  bool _contentVisible = true;

  Future<void> _onDestinationSelected(int index) async {
    if (_currentIndex == index) return;
    setState(() => _contentVisible = false);
    await Future.delayed(const Duration(milliseconds: 140));
    if (!mounted) return;
    setState(() {
      _currentIndex = index;
      _contentVisible = true;
    });
  }

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
      backgroundColor: _NatureTheme.background,
      body: AnimatedOpacity(
        opacity: _contentVisible ? 1 : 0,
        duration: const Duration(milliseconds: 240),
        curve: Curves.easeOut,
        child: IndexedStack(index: _currentIndex, children: pages),
      ),
      bottomNavigationBar: NavigationBar(
        backgroundColor: Colors.white,
        indicatorColor: _NatureTheme.primary.withOpacity(0.14),
        shadowColor: Colors.black12,
        surfaceTintColor: Colors.transparent,
        selectedIndex: _currentIndex,
        onDestinationSelected: _onDestinationSelected,
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
          NavigationDestination(
              icon: Icon(Icons.people_rounded), label: 'Akun'),
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
    final textTheme = Theme.of(context).textTheme;

    return _PageScaffold(
      title: 'Home',
      child: LayoutBuilder(
        builder: (context, constraints) {
          final isWide = constraints.maxWidth >= 700;
          final horizontal = isWide ? 24.0 : 16.0;
          final mapHeight = isWide ? 250.0 : 200.0;
          return ListView(
            padding: EdgeInsets.fromLTRB(horizontal, 16, horizontal, 24),
            children: [
              Container(
                padding: const EdgeInsets.all(24),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [Color(0xFF1E6B3C), Color(0xFF2D9B57)],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  borderRadius: BorderRadius.circular(20),
                  boxShadow: _NatureTheme.softShadow,
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Puncak Mas',
                      style: textTheme.headlineMedium?.copyWith(
                        color: Colors.white,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Bandar Lampung, Lampung',
                      style:
                          textTheme.bodyMedium?.copyWith(color: Colors.white70),
                    ),
                    const SizedBox(height: 12),
                    Container(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 12, vertical: 6),
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.14),
                        borderRadius: BorderRadius.circular(999),
                      ),
                      child: const Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Icon(Icons.forest_rounded,
                              color: Colors.white, size: 18),
                          SizedBox(width: 8),
                          Text(
                            'Wisata alam sejuk & aesthetic',
                            style: TextStyle(
                                color: Colors.white,
                                fontWeight: FontWeight.w600),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),
              _CardSection(
                title: 'Tentang Wisata',
                icon: Icons.landscape_rounded,
                child: Text(
                  'Puncak Mas merupakan destinasi wisata ikonik di atas perbukitan Kota Bandar Lampung. Menawarkan kombinasi udara sejuk dan panorama perkotaan dari ketinggian. Tempat ini menjadi favorit keluarga untuk menikmati sunset dan keindahan lampu kota di malam hari.',
                  style: textTheme.bodyMedium?.copyWith(
                    height: 1.6,
                    color: _NatureTheme.textSecondary,
                  ),
                ),
              ),
              const SizedBox(height: 12),
              _CardSection(
                title: 'Fasilitas Utama',
                icon: Icons.deck_rounded,
                child: Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: fasilitas
                      .map(
                        (item) => Container(
                          padding: const EdgeInsets.symmetric(
                              horizontal: 12, vertical: 8),
                          decoration: BoxDecoration(
                            color: const Color(0xFFE8F5EE),
                            borderRadius: BorderRadius.circular(999),
                          ),
                          child: Text(
                            item,
                            style: const TextStyle(
                              color: Color(0xFF1A2D23),
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                      )
                      .toList(),
                ),
              ),
              const SizedBox(height: 12),
              _CardSection(
                title: 'Maps Lokasi',
                icon: Icons.map_rounded,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    ClipRRect(
                      borderRadius: BorderRadius.circular(14),
                      child: SizedBox(
                        height: mapHeight,
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
                                    color: Color(0xFFE37A2E),
                                    size: 36,
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(height: 12),
                    Text(
                      'Puncak Mas - Bandar Lampung',
                      style: textTheme.titleMedium
                          ?.copyWith(fontWeight: FontWeight.w700),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      'Jl. PB. Marga, Sukadana Ham, Kota Bandar Lampung',
                      style: textTheme.bodyMedium
                          ?.copyWith(color: _NatureTheme.textSecondary),
                    ),
                    const SizedBox(height: 12),
                    Align(
                      alignment: Alignment.centerLeft,
                      child: FilledButton.icon(
                        onPressed: () => _openMapsLink(context, mapsLink),
                        style: FilledButton.styleFrom(
                          backgroundColor: _NatureTheme.primary,
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(
                              horizontal: 18, vertical: 12),
                          shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(14)),
                        ),
                        icon: const Icon(Icons.near_me_rounded),
                        label: const Text('Buka Maps'),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),
              FilledButton.icon(
                onPressed: onOpenTiket,
                style: FilledButton.styleFrom(
                  backgroundColor: _NatureTheme.secondary,
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 14),
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16)),
                ),
                icon: const Icon(Icons.confirmation_number_rounded),
                label: const Text('Lanjut ke Tiket'),
              ),
            ],
          );
        },
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
  final TextEditingController _jumlahController =
      TextEditingController(text: '1');
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
        const SnackBar(
            content: Text('Isi nama dan jumlah tiket dengan benar.')),
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
    final formatter =
        NumberFormat.currency(locale: 'id_ID', symbol: 'Rp ', decimalDigits: 0);
    final textTheme = Theme.of(context).textTheme;
    return _PageScaffold(
      title: 'Tiket',
      child: LayoutBuilder(
        builder: (context, constraints) {
          final isWide = constraints.maxWidth >= 700;
          final horizontal = isWide ? 24.0 : 16.0;
          return ListView(
            padding: EdgeInsets.fromLTRB(horizontal, 16, horizontal, 24),
            children: [
              _CardSection(
                title: 'Informasi Tiket',
                icon: Icons.local_activity_rounded,
                child: Column(
                  children: [
                    _priceRow('Senin - Jumat', 'Rp 20.000'),
                    const Divider(height: 20),
                    _priceRow('Sabtu - Minggu', 'Rp 25.000'),
                  ],
                ),
              ),
              const SizedBox(height: 12),
              _CardSection(
                title: 'Form Pembelian',
                icon: Icons.shopping_bag_rounded,
                child: Column(
                  children: [
                    TextField(
                      controller: _namaController,
                      decoration: _inputDecoration(
                          'Nama Pengunjung', Icons.person_rounded),
                    ),
                    const SizedBox(height: 12),
                    TextField(
                      controller: _jumlahController,
                      keyboardType: TextInputType.number,
                      decoration:
                          _inputDecoration('Jumlah Tiket', Icons.tag_rounded),
                      onChanged: (_) => setState(() {}),
                    ),
                    const SizedBox(height: 12),
                    DropdownButtonFormField<int>(
                      value: _harga,
                      items: const [
                        DropdownMenuItem(
                            value: 20000, child: Text('Weekday - Rp 20.000')),
                        DropdownMenuItem(
                            value: 25000, child: Text('Weekend - Rp 25.000')),
                      ],
                      onChanged: (value) =>
                          setState(() => _harga = value ?? 20000),
                      decoration: _inputDecoration(
                          'Pilih Harga Tiket', Icons.calendar_today_rounded),
                    ),
                    const SizedBox(height: 16),
                    Align(
                      alignment: Alignment.centerLeft,
                      child: Text(
                        'Estimasi total: ${formatter.format(totalPreview)}',
                        style: textTheme.titleMedium?.copyWith(
                          fontWeight: FontWeight.w700,
                          color: _NatureTheme.primary,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),
              FilledButton.icon(
                onPressed: _loading ? null : _beliSekarang,
                style: FilledButton.styleFrom(
                  backgroundColor: _NatureTheme.primary,
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 14),
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16)),
                ),
                icon: _loading
                    ? const SizedBox(
                        width: 18,
                        height: 18,
                        child: CircularProgressIndicator(
                            strokeWidth: 2, color: Colors.white),
                      )
                    : const Icon(Icons.shopping_cart_checkout_rounded),
                label: Text(_loading ? 'Memproses...' : 'Beli Sekarang'),
              ),
            ],
          );
        },
      ),
    );
  }

  InputDecoration _inputDecoration(String label, IconData icon) {
    return InputDecoration(
      labelText: label,
      prefixIcon: Icon(icon, color: _NatureTheme.primary),
      filled: true,
      fillColor: Colors.white,
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(14),
        borderSide: BorderSide.none,
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(14),
        borderSide: BorderSide(color: const Color(0xFFD5E0D9)),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(14),
        borderSide: const BorderSide(color: _NatureTheme.primary, width: 1.6),
      ),
    );
  }

  Widget _priceRow(String label, String value) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(label, style: const TextStyle(color: _NatureTheme.textSecondary)),
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
    final formatter = NumberFormat.currency(
      locale: 'id_ID',
      symbol: 'Rp ',
      decimalDigits: 0,
    );
    return _PageScaffold(
      title: 'Transaksi',
      actions: [
        IconButton(onPressed: _refresh, icon: const Icon(Icons.refresh_rounded))
      ],
      child: FutureBuilder<List<Wisata>>(
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
            return const Center(
                child: Text('Belum ada histori pembelian tiket.'));
          }

          return LayoutBuilder(
            builder: (context, constraints) {
              final horizontal = constraints.maxWidth >= 700 ? 24.0 : 16.0;
              return ListView.separated(
                padding: EdgeInsets.fromLTRB(horizontal, 16, horizontal, 24),
                itemCount: data.length,
                separatorBuilder: (_, __) => const SizedBox(height: 10),
                itemBuilder: (context, index) {
                  final item = data[index];
                  return _PressableCard(
                    onTap: () {},
                    child: Row(
                      children: [
                        CircleAvatar(
                          backgroundColor: const Color(0xFFE8F5EE),
                          child: Text(
                            '#${item.id}',
                            style: const TextStyle(
                              fontWeight: FontWeight.w700,
                              color: _NatureTheme.textPrimary,
                            ),
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                item.nama,
                                style: const TextStyle(
                                    fontWeight: FontWeight.w800),
                              ),
                              const SizedBox(height: 4),
                              Text(
                                '${_formatDate(item.tanggal)} • ${item.jumlah} tiket',
                                style: const TextStyle(
                                    color: _NatureTheme.textSecondary),
                              ),
                            ],
                          ),
                        ),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.end,
                          children: [
                            Text(
                              formatter.format(item.total),
                              style: const TextStyle(
                                color: _NatureTheme.primary,
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
    final textTheme = Theme.of(context).textTheme;
    return _PageScaffold(
      title: 'Akun',
      child: LayoutBuilder(
        builder: (context, constraints) {
          final horizontal = constraints.maxWidth >= 700 ? 24.0 : 16.0;
          return ListView(
            padding: EdgeInsets.fromLTRB(horizontal, 16, horizontal, 24),
            children: [
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  boxShadow: _NatureTheme.softShadow,
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    const Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(
                          Icons.account_circle_rounded,
                          color: _NatureTheme.primary,
                          size: 20,
                        ),
                        SizedBox(width: 8),
                        Text(
                          'Profil Pengunjung',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w800,
                            color: _NatureTheme.textPrimary,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    Container(
                      padding: const EdgeInsets.all(3),
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        border: Border.all(
                            color: const Color(0xFFDCE9E1), width: 2),
                      ),
                      child: const CircleAvatar(
                        radius: 34,
                        backgroundColor: Color(0xFFE8F5EE),
                        child: Icon(Icons.person_rounded,
                            size: 40, color: _NatureTheme.primary),
                      ),
                    ),
                    const SizedBox(height: 12),
                    Text(
                      'Pengunjung Puncak Mas',
                      textAlign: TextAlign.center,
                      style: textTheme.titleMedium
                          ?.copyWith(fontWeight: FontWeight.w800),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      'guest@puncakmas.app',
                      textAlign: TextAlign.center,
                      style: textTheme.bodyMedium
                          ?.copyWith(color: _NatureTheme.textSecondary),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),
              FilledButton.icon(
                onPressed: onLogout,
                style: FilledButton.styleFrom(
                  backgroundColor: const Color(0xFFB23A2E),
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 14),
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16)),
                ),
                icon: const Icon(Icons.logout_rounded),
                label: const Text('Logout'),
              ),
            ],
          );
        },
      ),
    );
  }
}

class _PageScaffold extends StatelessWidget {
  const _PageScaffold({
    required this.title,
    required this.child,
    this.actions,
  });

  final String title;
  final Widget child;
  final List<Widget>? actions;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: _NatureTheme.background,
      appBar: AppBar(
        title: Text(title),
        actions: actions,
        backgroundColor: _NatureTheme.background,
        surfaceTintColor: Colors.transparent,
        elevation: 0,
      ),
      body: child,
    );
  }
}

class _CardSection extends StatelessWidget {
  const _CardSection({
    required this.title,
    required this.child,
    this.icon,
  });

  final String title;
  final Widget child;
  final IconData? icon;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: _NatureTheme.softShadow,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              if (icon != null) ...[
                Icon(icon, color: _NatureTheme.primary, size: 20),
                const SizedBox(width: 8),
              ],
              Text(
                title,
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w800,
                  color: _NatureTheme.textPrimary,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          child,
        ],
      ),
    );
  }
}

class _PressableCard extends StatefulWidget {
  const _PressableCard({
    required this.child,
    this.onTap,
  });

  final Widget child;
  final VoidCallback? onTap;

  @override
  State<_PressableCard> createState() => _PressableCardState();
}

class _PressableCardState extends State<_PressableCard> {
  bool _pressed = false;

  void _setPressed(bool value) {
    if (_pressed == value) return;
    setState(() => _pressed = value);
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: (_) => _setPressed(true),
      onTapUp: (_) => _setPressed(false),
      onTapCancel: () => _setPressed(false),
      onTap: widget.onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 220),
        curve: Curves.easeOut,
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: _pressed ? const Color(0xFFF3F9F4) : Colors.white,
          borderRadius: BorderRadius.circular(16),
          boxShadow: _pressed ? [] : _NatureTheme.softShadow,
        ),
        child: Stack(
          children: [
            widget.child,
            Positioned.fill(
              child: IgnorePointer(
                child: AnimatedOpacity(
                  opacity: _pressed ? 0.1 : 0,
                  duration: const Duration(milliseconds: 220),
                  child: Container(
                    decoration: BoxDecoration(
                      color: _NatureTheme.primary,
                      borderRadius: BorderRadius.circular(16),
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _NatureTheme {
  static const Color primary = Color(0xFF2A6B45);
  static const Color secondary = Color(0xFF7A5637);
  static const Color background = Color(0xFFF5F2EA);
  static const Color textPrimary = Color(0xFF1F2D25);
  static const Color textSecondary = Color(0xFF5A655E);

  static List<BoxShadow> get softShadow => const [
        BoxShadow(
          color: Color(0x14000000),
          blurRadius: 20,
          offset: Offset(0, 8),
        ),
      ];
}
