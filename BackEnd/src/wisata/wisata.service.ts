import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import type { CreateWisataDto } from './dto/create-wisata.dto';
import type { UpdateWisataDto } from './dto/update-wisata-dto';

@Injectable()
export class WisataService {
    private wisata = [
        {
            id: 1,
            nama: "Puncak Mas",
            lokasi: "Lampung",
            deskripsi: "Wisata pemandangan bukit",
            fasilitas: ["Spot Foto", "Cafe"],
            hargaTiket: 20000,
            jamBuka: "08:00",
            pengunjung: 120
        },
        {
            id: 2,
            nama: "Puncak Mas 2",
            lokasi: "Lampung",
            deskripsi: "Wisata alam Lampung",
            fasilitas: ["Mushola", "Parkir"],
            hargaTiket: 15000,
            jamBuka: "09:00",
            pengunjung: 80
        }
    ];

      private idCounter = 3;

    findAll() {
        return this.wisata;
    }

    findOne(id: number) {
        const matchingWisata = this.wisata.find((wisata) => wisata.id === id);

        if (!matchingWisata) {
            throw new NotFoundException (`Wisata dengan ID ${id} tidak ditemukan.`)
        }

        return matchingWisata;
    }

    create(createWisataDto: CreateWisataDto) {
        const createdWisata = {
            id: this.idCounter++,
            ...createWisataDto
        };

        this.wisata.push(createdWisata);
        return createdWisata;
    }

    update(id: number, updateWisataDto: UpdateWisataDto) {
    const index = this.wisata.findIndex((item) => item.id === id);

    if (index === -1) {
        throw new NotFoundException(`Wisata dengan ID ${id} tidak ditemukan`); // Atau sebaiknya throw NotFoundException
    }

    // Gabungkan data lama dengan data baru
    // Data yang tidak ada di updateWisataDto tidak akan berubah
    this.wisata[index] = {
        ...this.wisata[index],
        ...updateWisataDto
    };

    return this.wisata[index];
}

    remove(id: number): void{
        const matchingWisataIndex = this.wisata.findIndex(
            (wisata) => wisata.id === id
        );

        if (matchingWisataIndex === -1) {
            throw new NotFoundException(`Wisata dengan ID ${id} tidak ditemukan.`);
        }

            this.wisata.splice(matchingWisataIndex, 1);
        }
}
