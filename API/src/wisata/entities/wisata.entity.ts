import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('wisata')
export class Wisata {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nama: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  tanggal: Date;

  @Column()
  jumlah: number;

  @Column({ name: 'harga_tiket' })
  hargaTiket: number;

  @Column()
  total: number;
}