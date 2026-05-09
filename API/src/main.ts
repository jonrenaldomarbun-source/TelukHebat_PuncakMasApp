import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

/**
 * bootstrap() adalah fungsi utama untuk menghidupkan server.
 */
async function bootstrap() {
  // Membuat aplikasi berdasarkan aturan yang ada di AppModule
  const app = await NestFactory.create(AppModule);

  // 1. Izin Akses (CORS): Memperbolehkan website lain (seperti CMS) untuk memanggil API ini
  app.enableCors(); 

  // 2. Satpam Validasi (Global Pipe): Mengecek setiap data yang masuk
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,               // Buang data "sampah" yang tidak ada di DTO
    forbidNonWhitelisted: false,   // Jangan error jika ada data asing, abaikan saja
    transform: true,               // Otomatis ubah data ke tipe yang benar (misal: tulisan "1" jadi angka 1)
    transformOptions: {
      enableImplicitConversion: true, // Memudahkan perubahan tipe data secara otomatis
    },
  }));

  // 3. Menentukan Nomor Pintu (Port): Pakai port dari server atau default 3000
  const port = process.env.PORT ?? 3000;
  
  // Nyalakan aplikasi!
  await app.listen(port);
  console.log(`Server sudah jalan di: http://localhost:${port}`);
}

// Jalankan fungsi bootstrap
bootstrap();