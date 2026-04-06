import { CreateWisataDto } from './dto/create-wisata.dto';
export declare class WisataController {
    findAll(nama?: string): {
        id: number;
        nama: string;
        lokasi: string;
        pengunjung: number;
    }[];
    findOne(id: string): {
        id: string;
        nama: string;
        lokasi: string;
        pengunjung: number;
    };
    create(createWisataDto: CreateWisataDto): typeof CreateWisataDto;
}
