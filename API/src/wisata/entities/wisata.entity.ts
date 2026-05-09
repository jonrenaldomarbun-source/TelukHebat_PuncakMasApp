import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Representasi tabel 'wisata' dalam database.
 * Mengatur skema kolom, tipe data, dan nilai default.
 */
@Entity('wisata')
export class Wisata {

  @PrimaryGeneratedColumn()
  id: number; // Primary key dengan auto-increment

  @Column()
  nama: string; // Nama pengunjung atau destinasi

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  tanggal: Date; // Waktu transaksi otomatis diset ke waktu saat ini

  @Column()
  jumlah: number; // Kuantitas tiket atau jumlah orang

  @Column({ name: 'harga_tiket' })
  hargaTiket: number; // Mapping kolom database 'harga_tiket' ke properti camelCase

  @Column()
  total: number; // Total bayar (hasil kalkulasi jumlah * harga)
}