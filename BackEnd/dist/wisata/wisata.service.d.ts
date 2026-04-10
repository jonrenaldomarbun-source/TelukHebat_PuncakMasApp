import type { CreateWisataDto } from './dto/create-wisata.dto';
export declare class WisataService {
    private wisata;
    findAll(): {
        id: `${string}-${string}-${string}-${string}-${string}`;
        nama: string;
        lokasi: string;
        deskripsi: string;
        fasilitas: string[];
        hargaTiket: number;
        jamBuka: string;
        pengunjung: number;
    }[];
    findOne(id: string): {
        id: `${string}-${string}-${string}-${string}-${string}`;
        nama: string;
        lokasi: string;
        deskripsi: string;
        fasilitas: string[];
        hargaTiket: number;
        jamBuka: string;
        pengunjung: number;
    } | undefined;
    create(createWisataDto: CreateWisataDto): {
        nama: string;
        lokasi: string;
        deskripsi: string;
        fasilitas: string[];
        hargaTiket: number;
        jamBuka: string;
        pengunjung: number;
        id: `${string}-${string}-${string}-${string}-${string}`;
    };
}
