import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import type { CreateWisataDto } from './dto/create-wisata.dto';
import type { UpdateWisataDto } from './dto/update-wisata-dto';
import { match } from 'assert';

@Injectable()
export class WisataService {
    private wisata = [
        {
            id: randomUUID(),
            nama: "Puncak Mas",
            lokasi: "Lampung",
            deskripsi: "Wisata pemandangan bukit",
            fasilitas: ["Spot Foto", "Cafe"],
            hargaTiket: 20000,
            jamBuka: "08:00",
            pengunjung: 120
        },
        {
            id: randomUUID(),
            nama: "Puncak Mas 2",
            lokasi: "Lampung",
            deskripsi: "Wisata alam Lampung",
            fasilitas: ["Mushola", "Parkir"],
            hargaTiket: 15000,
            jamBuka: "09:00",
            pengunjung: 80
        }
    ];

    findAll() {
        return this.wisata;
    }

    findOne(id: string) {
        return this.wisata.find((wisata) => wisata.id === id);
    }

    create(createWisataDto: CreateWisataDto) {
        const createdWisata = {
            id: randomUUID(),
            ...createWisataDto
        };

        this.wisata.push(createdWisata);
        return createdWisata;
    }

    update(id: string, updateWisataDto: UpdateWisataDto) {
    const index = this.wisata.findIndex((item) => item.id === id);

    if (index === -1) {
        return {}; // Atau sebaiknya throw NotFoundException
    }

    // Gabungkan data lama dengan data baru
    // Data yang tidak ada di updateWisataDto tidak akan berubah
    this.wisata[index] = {
        ...this.wisata[index],
        ...updateWisataDto
    };

    return this.wisata[index];
}

    remove(id: string): void{
        const matchiingWisataIndex = this.wisata.findIndex(
            (wisata) => wisata.id === id
        );

        if (matchiingWisataIndex > -1) {
            this.wisata.splice(matchiingWisataIndex, 1);
        }
    }

}
