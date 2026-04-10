import { Injectable } from '@nestjs/common';

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
}
