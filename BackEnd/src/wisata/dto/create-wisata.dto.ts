import { Length, IsString, IsNumber, IsArray, IsNotEmpty, Min, IsOptional } from 'class-validator';

export class CreateWisataDto {
    @IsString()
    @IsNotEmpty({ message: 'Nama tempat wisata harus diisi' })
    @Length(3, 100)
    nama: string;

    @IsString()
    @IsNotEmpty()
    lokasi: string;

    @IsString()
    @IsOptional() // Deskripsi boleh kosong kalau belum ada
    deskripsi: string;

    @IsArray()
    @IsString({ each: true }) // Tiap item di dalam array harus string
    fasilitas: string[];

    @IsNumber()
    @Min(0)
    hargaTiket: number;

    @IsString()
    jamBuka: string;

    @IsNumber()
    @IsOptional()
    pengunjung: number;
}