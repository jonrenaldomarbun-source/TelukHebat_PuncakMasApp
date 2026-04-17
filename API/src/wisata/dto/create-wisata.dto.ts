import { IsString, IsNumber, IsNotEmpty, Min, IsDateString, Length } from 'class-validator';

export class CreateWisataDto {
    @IsDateString({}, { message: 'Format tanggal tidak valid' })
    @IsNotEmpty()
    Tanggal: string;

    @IsString()
    @IsNotEmpty({ message: 'Nama Pengunjung harus diisi' })
    @Length(3, 100)
    Nama: string; // Di UI ini adalah "Nama Pengunjung"

    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    Jumlah: number; // Tambahkan ini! Karena di UI ada kolom "Jumlah"

    @IsNumber()
    @Min(0)
    @IsNotEmpty()
    Harga: number; // Di UI ini adalah "Harga"
}