import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WisataModule } from './wisata/wisata.module';
import { Wisata } from './wisata/entities/wisata.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', 
      host: 'localhost',
      port: 3306, // Port default MySQL di XAMPP
      username: 'root', // User default XAMPP
      password: '', // Password default XAMPP kosong
      database: 'puncak_mas_db', // Pastikan kamu sudah CREATE DATABASE di phpMyAdmin
      entities: [Wisata],
      synchronize: true, // Tabel otomatis dibuat saat running
    }),
    WisataModule,
  ],
})
export class AppModule {}