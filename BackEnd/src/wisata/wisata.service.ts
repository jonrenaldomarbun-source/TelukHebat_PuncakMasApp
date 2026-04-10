import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import type { CreateWisataDto } from './dto/create-wisata.dto';

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
}
