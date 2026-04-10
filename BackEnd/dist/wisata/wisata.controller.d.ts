import { CreateWisataDto } from './dto/create-wisata.dto';
import { UpdateWisataDto } from './dto/update-wisata-dto';
import { WisataService } from './wisata.service';
export declare class WisataController {
    private wisataService;
    constructor(wisataService: WisataService);
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
