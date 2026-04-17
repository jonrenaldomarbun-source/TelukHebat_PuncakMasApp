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
        // Hitung total secara otomatis di Backend
        const totalHitung = createWisataDto.jumlah * createWisataDto.hargaTiket;

        const createdWisata = {
            id: this.idCounter++,
            ...createWisataDto,
            total: totalHitung // Simpan hasil hitungan ke objek
        };

        this.wisata.push(createdWisata);
        return createdWisata;
    }

    update(id: number, updateWisataDto: UpdateWisataDto) {
        const index = this.wisata.findIndex((item) => item.id === id);

        if (index === -1) {
            throw new NotFoundException(`Data transaksi dengan ID ${id} tidak ditemukan`);
        }

        // Gabungkan data lama dengan data baru
        const updatedData = {
            ...this.wisata[index],
            ...updateWisataDto
        };

        // Jika jumlah atau hargaTiket di-update, pastikan totalnya dihitung ulang!
        updatedData.total = updatedData.jumlah * updatedData.hargaTiket;

        this.wisata[index] = updatedData;

        return this.wisata[index];
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