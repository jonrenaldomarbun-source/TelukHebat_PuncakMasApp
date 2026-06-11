import 'package:flutter/material.dart';
import 'screens/splash_screen.dart';

void main() {
  runApp(const PuncakMasApp());
}

class PuncakMasApp extends StatelessWidget {
  const PuncakMasApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'PuncakMas',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF1E6B3C), // Hijau alam pegunungan
          brightness: Brightness.light,
        ),
        fontFamily: 'Roboto',
        useMaterial3: true,
        appBarTheme: const AppBarTheme(
          backgroundColor: Color(0xFF1E6B3C),
          foregroundColor: Colors.white,
          elevation: 0,
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            backgroundColor: const Color(0xFF1E6B3C),
            foregroundColor: Colors.white,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
          ),
        ),
      ),
      home: const SplashScreen(),
    );
  }
}
