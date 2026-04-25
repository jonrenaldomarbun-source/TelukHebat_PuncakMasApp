import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wisata } from './entities/wisata.entity';
import type { CreateWisataDto } from './dto/create-wisata.dto';
import type { UpdateWisataDto } from './dto/update-wisata-dto';

@Injectable()
export class WisataService {
    constructor(
        @InjectRepository(Wisata)
        private readonly wisataRepo: Repository<Wisata>, // Pipa ke MySQL
    ) { }

    // Ambil semua data dari tabel MySQL
    async findAll() {
        return await this.wisataRepo.find();
    }

    // Cari satu data berdasarkan ID
    async findOne(id: number) {
        const data = await this.wisataRepo.findOne({ where: { id } });
        if (!data) throw new NotFoundException(`ID ${id} tidak ada di DB`);
        return data;
    }

    // Simpan data baru ke MySQL
    async create(dto: CreateWisataDto) {
        const totalHitung = dto.Jumlah * dto.Harga;

        const newRecord = this.wisataRepo.create({
            tanggal: new Date(dto.Tanggal),
            nama: dto.Nama,
            jumlah: dto.Jumlah,
            hargaTiket: dto.Harga,
            total: totalHitung,
        });

        return await this.wisataRepo.save(newRecord);
    }

    // Update data di MySQL
    async update(id: number, dto: UpdateWisataDto) {
        const dataLama = await this.findOne(id);

        // Pastikan variabel penampung menggunakan nilai baru jika ada, jika tidak pakai data lama
        const namaBaru = dto.Nama ?? dataLama.nama;
        const tanggalBaru = dto.Tanggal ? new Date(dto.Tanggal) : dataLama.tanggal;
        const jumlahBaru = dto.Jumlah ?? dataLama.jumlah;
        const hargaBaru = dto.Harga ?? dataLama.hargaTiket;
        const totalBaru = jumlahBaru * hargaBaru;

        const updatedData = await this.wisataRepo.preload({
            id: id,
            nama: namaBaru,
            tanggal: tanggalBaru,
            jumlah: jumlahBaru,
            hargaTiket: hargaBaru,
            total: totalBaru,
        });

        if (!updatedData) throw new NotFoundException('Update gagal');
        return await this.wisataRepo.save(updatedData);
    }

    // Hapus data dari MySQL
    async remove(id: number) {
        const data = await this.findOne(id);
        return await this.wisataRepo.remove(data);
    }
}