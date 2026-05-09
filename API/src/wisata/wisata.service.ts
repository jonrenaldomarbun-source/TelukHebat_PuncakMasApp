import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wisata } from './entities/wisata.entity';
import type { CreateWisataDto } from './dto/create-wisata.dto';
import type { UpdateWisataDto } from './dto/update-wisata-dto';

/**
 * WisataService adalah otak dari aplikasi ini.
 * Tempat semua logika seperti menghitung total harga dan mengelola data ke database.
 */
@Injectable()
export class WisataService {
    constructor(
        @InjectRepository(Wisata)
        private readonly wisataRepo: Repository<Wisata>, // Ini adalah akses langsung ke lemari database (MySQL)
    ) { }

    // Mengambil semua catatan wisata yang ada
    async findAll() {
        return await this.wisataRepo.find();
    }

    // Mencari satu data wisata. Jika tidak ketemu, beri peringatan "ID tidak ada"
    async findOne(id: number) {
        const data = await this.wisataRepo.findOne({ where: { id } });
        if (!data) throw new NotFoundException(`ID ${id} tidak ada di database`);
        return data;
    }

    // Proses membuat catatan wisata baru
    async create(dto: CreateWisataDto) {
        // Otomatis menghitung: Jumlah tiket x Harga
        const totalHitung = dto.Jumlah * dto.Harga;

        // Menyiapkan data sebelum dimasukkan ke database
        const newRecord = this.wisataRepo.create({
            tanggal: new Date(dto.Tanggal),
            nama: dto.Nama,
            jumlah: dto.Jumlah,
            hargaTiket: dto.Harga,
            total: totalHitung,
        });

        // Simpan ke database
        return await this.wisataRepo.save(newRecord);
    }

    // Proses memperbarui data yang sudah ada
    async update(id: number, dto: UpdateWisataDto) {
        // 1. Cek dulu apakah datanya ada?
        const dataLama = await this.findOne(id);

        // 2. Gabungkan data: pakai yang baru jika ada, jika tidak pakai data lama
        const namaBaru = dto.Nama ?? dataLama.nama;
        const tanggalBaru = dto.Tanggal ? new Date(dto.Tanggal) : dataLama.tanggal;
        const jumlahBaru = dto.Jumlah ?? dataLama.jumlah;
        const hargaBaru = dto.Harga ?? dataLama.hargaTiket;
        const totalBaru = jumlahBaru * hargaBaru; // Hitung ulang totalnya

        // 3. Siapkan data untuk ditumpuk (preload) ke ID yang sama
        const updatedData = await this.wisataRepo.preload({
            id: id,
            nama: namaBaru,
            tanggal: tanggalBaru,
            jumlah: jumlahBaru,
            hargaTiket: hargaBaru,
            total: totalBaru,
        });

        if (!updatedData) throw new NotFoundException('Gagal memperbarui data');
        return await this.wisataRepo.save(updatedData);
    }

    // Menghapus data berdasarkan ID
    async remove(id: number) {
        const data = await this.findOne(id); // Cari dulu, kalau ada baru hapus
        return await this.wisataRepo.remove(data);
    }
}