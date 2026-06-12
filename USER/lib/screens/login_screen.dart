import 'package:flutter/material.dart';
import 'home_screen.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController _usernameController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  bool _isPasswordVisible = false;
  bool _isLoading = false;
  String? _errorMessage;

  // [DEMO MODE] Login pengunjung menggunakan akun demo lokal.
  // Sistem ini tidak memiliki tabel akun pengunjung di database API.
  // Pengunjung mengakses endpoint publik (GET /wisata) tanpa memerlukan
  // autentikasi API.
  //
  // TODO: Jika fitur akun pengunjung dibutuhkan di masa depan,
  // ganti dengan pemanggilan POST /auth/user/login ke API.
  static const String _dummyUsername = 'Budi';
  static const String _dummyPassword = 'Budi123';

  @override
  void dispose() {
    _usernameController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _login() async {
    final username = _usernameController.text.trim();
    final password = _passwordController.text.trim();

    setState(() => _errorMessage = null);

    if (username.isEmpty || password.isEmpty) {
      setState(() {
        _errorMessage = 'Username dan password tidak boleh kosong';
      });
      return;
    }

    setState(() => _isLoading = true);
    await Future.delayed(const Duration(milliseconds: 1500));

    if (!mounted) return;

    if (username == _dummyUsername && password == _dummyPassword) {
      if (mounted) {
        Navigator.of(context).pushReplacement(
          PageRouteBuilder(
            pageBuilder: (_, __, ___) => const HomeScreen(),
            transitionsBuilder: (_, anim, __, child) =>
                FadeTransition(opacity: anim, child: child),
            transitionDuration: const Duration(milliseconds: 300),
          ),
        );
      }
    } else {
      setState(() {
        _isLoading = false;
        _errorMessage = 'Username atau password salah';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    final isMobile = MediaQuery.of(context).size.width < 600;

    return Scaffold(
      backgroundColor: const Color(0xFF1E6B3C),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 20.0),
          child: Column(
            children: [
              Container(
                padding: const EdgeInsets.symmetric(vertical: 30),
                child: Column(
                  children: [
                    Container(
                      width: 100,
                      height: 100,
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.15),
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(
                        Icons.landscape_rounded,
                        size: 60,
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(height: 20),
                    const Text(
                      'PuncakMas',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 32,
                        fontWeight: FontWeight.w900,
                        letterSpacing: 1.2,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Wisata Alam Lampung',
                      style: TextStyle(
                        color: Colors.white.withOpacity(0.75),
                        fontSize: 14,
                      ),
                    ),
                  ],
                ),
              ),
              Container(
                margin: EdgeInsets.symmetric(
                  horizontal: isMobile ? 20 : 40,
                ),
                padding: const EdgeInsets.all(24),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(20),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.2),
                      blurRadius: 15,
                      offset: const Offset(0, 8),
                    ),
                  ],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Masuk ke Akun',
                      style: textTheme.headlineSmall?.copyWith(
                        fontWeight: FontWeight.w800,
                        color: const Color(0xFF1E6B3C),
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Gunakan akun Anda untuk mengakses aplikasi',
                      style: textTheme.bodyMedium?.copyWith(
                        color: const Color(0xFF7B8A86),
                      ),
                    ),
                    const SizedBox(height: 24),
                    if (_errorMessage != null) ...[
                      Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: const Color(0xFFFFEBEE),
                          borderRadius: BorderRadius.circular(8),
                          border: Border.all(
                            color: const Color(0xFFEF5350),
                            width: 1,
                          ),
                        ),
                        child: Row(
                          children: [
                            const Icon(
                              Icons.error_rounded,
                              color: Color(0xFFEF5350),
                              size: 20,
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: Text(
                                _errorMessage!,
                                style: const TextStyle(
                                  color: Color(0xFFEF5350),
                                  fontWeight: FontWeight.w600,
                                  fontSize: 13,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 16),
                    ],
                    TextField(
                      controller: _usernameController,
                      enabled: !_isLoading,
                      decoration: InputDecoration(
                        labelText: 'Username',
                        hintText: 'Masukkan username Anda',
                        prefixIcon: const Icon(Icons.person_rounded),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                        contentPadding: const EdgeInsets.symmetric(
                          horizontal: 16,
                          vertical: 14,
                        ),
                      ),
                    ),
                    const SizedBox(height: 16),
                    TextField(
                      controller: _passwordController,
                      enabled: !_isLoading,
                      obscureText: !_isPasswordVisible,
                      decoration: InputDecoration(
                        labelText: 'Password',
                        hintText: 'Masukkan password Anda',
                        prefixIcon: const Icon(Icons.lock_rounded),
                        suffixIcon: IconButton(
                          icon: Icon(
                            _isPasswordVisible
                                ? Icons.visibility_rounded
                                : Icons.visibility_off_rounded,
                          ),
                          onPressed: () {
                            setState(() {
                              _isPasswordVisible = !_isPasswordVisible;
                            });
                          },
                        ),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                        contentPadding: const EdgeInsets.symmetric(
                          horizontal: 16,
                          vertical: 14,
                        ),
                      ),
                    ),
                    const SizedBox(height: 24),
                    SizedBox(
                      width: double.infinity,
                      child: FilledButton(
                        onPressed: _isLoading ? null : _login,
                        style: FilledButton.styleFrom(
                          backgroundColor: const Color(0xFF1E6B3C),
                          padding: const EdgeInsets.symmetric(vertical: 14),
                        ),
                        child: _isLoading
                            ? const SizedBox(
                                height: 20,
                                width: 20,
                                child: CircularProgressIndicator(
                                  valueColor: AlwaysStoppedAnimation<Color>(
                                    Colors.white,
                                  ),
                                  strokeWidth: 2.5,
                                ),
                              )
                            : const Text(
                                'Masuk',
                                style: TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.w700,
                                ),
                              ),
                      ),
                    ),
                    const SizedBox(height: 16),
                    Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: const Color(0xFFF5F5F5),
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(
                          color: const Color(0xFFE8E8E8),
                        ),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              const Icon(
                                Icons.info_rounded,
                                size: 16,
                                color: Color(0xFF7B8A86),
                              ),
                              const SizedBox(width: 8),
                              Text(
                                'Akun Demo',
                                style: textTheme.labelLarge?.copyWith(
                                  color: const Color(0xFF1E6B3C),
                                  fontWeight: FontWeight.w700,
                                  fontSize: 12,
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 10),
                          Container(
                            padding: const EdgeInsets.all(10),
                            decoration: BoxDecoration(
                              color: Colors.white,
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  children: [
                                    const Text(
                                      'Username:',
                                      style: TextStyle(
                                        fontWeight: FontWeight.w600,
                                        color: Color(0xFF1E6B3C),
                                        fontSize: 12,
                                      ),
                                    ),
                                    const SizedBox(width: 8),
                                    Expanded(
                                      child: SelectableText(
                                        _dummyUsername,
                                        style: const TextStyle(
                                          fontFamily: 'Courier',
                                          fontWeight: FontWeight.w700,
                                          color: Color(0xFF2D9B57),
                                          fontSize: 12,
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                                const SizedBox(height: 6),
                                Row(
                                  children: [
                                    const Text(
                                      'Password:',
                                      style: TextStyle(
                                        fontWeight: FontWeight.w600,
                                        color: Color(0xFF1E6B3C),
                                        fontSize: 12,
                                      ),
                                    ),
                                    const SizedBox(width: 8),
                                    Expanded(
                                      child: SelectableText(
                                        _dummyPassword,
                                        style: const TextStyle(
                                          fontFamily: 'Courier',
                                          fontWeight: FontWeight.w700,
                                          color: Color(0xFF2D9B57),
                                          fontSize: 12,
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 40),
            ],
          ),
        ),
      ),
    );
  }
}
