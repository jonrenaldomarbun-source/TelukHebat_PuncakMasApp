import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateWisataDto } from './dto/create-wisata.dto';
import type { UpdateWisataDto } from './dto/update-wisata-dto';

@Injectable()
export class WisataService {
    // Data dummy disesuaikan dengan form CMS Transaksi
    private wisata = [
        {
            id: 1,
            tanggal: "2026-04-17",
            nama: "bomay",
            jumlah: 5,
            hargaTiket: 50000,
            total: 250000 // Hasil dari 5 * 50000
        }
    ];

    private idCounter = 2; // Mulai dari 2 karena ID 1 sudah terpakai

    findAll() {
        return this.wisata;
    }

    findOne(id: number) {
        const matchingWisata = this.wisata.find((wisata) => wisata.id === id);

        if (!matchingWisata) {
            throw new NotFoundException(`Data transaksi dengan ID ${id} tidak ditemukan.`);
        }

        return matchingWisata;
    }

    create(createWisataDto: CreateWisataDto) {
        // Hitung total secara otomatis
        const totalHitung = createWisataDto.Jumlah * createWisataDto.Harga;

        const createdWisata = {
            id: this.idCounter++,
            // Mapping secara manual agar sinkron dengan property di array 'wisata'
            tanggal: createWisataDto.Tanggal,
            nama: createWisataDto.Nama,
            jumlah: createWisataDto.Jumlah,
            hargaTiket: createWisataDto.Harga,
            total: totalHitung
        };

        this.wisata.push(createdWisata);
        return createdWisata;
    }

    update(id: number, updateWisataDto: UpdateWisataDto) {
        const index = this.wisata.findIndex((item) => item.id === id);

        if (index === -1) {
            throw new NotFoundException(`Data dengan ID ${id} tidak ditemukan.`);
        }

        // 1. Ambil data lama yang lengkap (nama, tanggal, jumlah, dll)
        const dataLama = this.wisata[index];

        // 2. Gabungkan secara manual dan sangat spesifik.
        // Jika field di DTO kosong, kita tetap pakai data yang lama (dataLama).
        const dataBaru = {
            id: dataLama.id, // ID tetap pakai yang lama
            tanggal: updateWisataDto.Tanggal ?? dataLama.tanggal,
            nama: updateWisataDto.Nama ?? dataLama.nama,
            jumlah: updateWisataDto.Jumlah ?? dataLama.jumlah,
            hargaTiket: updateWisataDto.Harga ?? dataLama.hargaTiket,
            total: 0 // Akan dihitung di bawah
        };

        // 3. Hitung ulang totalnya berdasarkan data yang sudah pasti ada
        dataBaru.total = dataBaru.jumlah * dataBaru.hargaTiket;

        // 4. Masukkan kembali ke array memory
        this.wisata[index] = dataBaru;

        return dataBaru;
    }

    remove(id: number): void {
        const matchingWisataIndex = this.wisata.findIndex(
            (wisata) => wisata.id === id
        );

        if (matchingWisataIndex === -1) {
            throw new NotFoundException(`Data transaksi dengan ID ${id} tidak ditemukan.`);
        }

        this.wisata.splice(matchingWisataIndex, 1);
    }
}