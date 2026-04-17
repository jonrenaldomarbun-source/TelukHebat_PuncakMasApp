import { IsString, IsNumber, IsNotEmpty, Min, IsDateString, Length } from 'class-validator';

export class CreateWisataDto {
    @IsDateString({}, { message: 'Format tanggal tidak valid' })
    @IsNotEmpty()
    tanggal: string;

    @IsString()
    @IsNotEmpty({ message: 'Nama Pengunjung harus diisi' })
    @Length(3, 100)
    nama: string; // Di UI ini adalah "Nama Pengunjung"

    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    jumlah: number; // Tambahkan ini! Karena di UI ada kolom "Jumlah"

    @IsNumber()
    @Min(0)
    @IsNotEmpty()
    hargaTiket: number; // Di UI ini adalah "Harga"
}