import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WisataModule } from './wisata/wisata.module';
import { Wisata } from './wisata/entities/wisata.entity';
import { AuthModule } from './auth/auth.module';
import { Admin } from './auth/entities/admin.entity';

/**
 * AppModule adalah pintu masuk utama aplikasi.
 * Tugasnya menghubungkan aplikasi ke database dan menggabungkan semua modul fitur.
 */
@Module({
  imports: [
    // 1. Mengatur koneksi utama ke database MySQL (XAMPP)
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',    // Alamat database 
      port: 3306,           // Gerbang masuk standar untuk MySQL
      username: 'root',      // Nama admin database (bawaan XAMPP)
      password: '',          // Kata sandi (kosong secara default di XAMPP)
      database: 'puncak_mas_db', // Nama data yang dibuat di phpMyAdmin
      entities: [Wisata, Admin],    // Daftar tabel yang ingin dikenali oleh database ini

      // Sinkronisasi otomatis: Jika ubah file entity, tabel di database ikut berubah
      synchronize: true,
    }),

    // 2. Memasukkan fitur Wisata agar bisa digunakan oleh aplikasi
    WisataModule,

    // 3. Masukkan Auth Module di sini agar rute /auth bisa diaksses
    AuthModule,
  ],
})
export class AppModule { }