import { CreateWisataDto } from './dto/create-wisata.dto';
import { UpdateWisataDto } from './dto/update-wisata-dto';
export declare class WisataController {
    findAll(nama?: string): {
        id: number;
        nama: string;
        lokasi: string;
        deskripsi: string;
        fasilitas: string[];
        hargaTiket: number;
        jamBuka: string;
        pengunjung: number;
    }[];
    findOne(id: string): {
        id: string;
        nama: string;
        lokasi: string;
        deskripsi: string;
        fasilitas: string[];
        hargaTiket: number;
        jamBuka: string;
        pengunjung: number;
    };
    create(createWisataDto: CreateWisataDto): {
        nama: string;
        lokasi: string;
        deskripsi: string;
        fasilitas: string[];
        hargaTiket: number;
        jamBuka: string;
        pengunjung: number;
    };
    update(id: string, updateWisataDto: UpdateWisataDto): {
        nama: string;
        lokasi: string;
        deskripsi: string;
        fasilitas: string[];
        hargaTiket: number;
        jamBuka: string;
        pengunjung: number;
        id: string;
    };
    remove(id: string): void;
}
