import { IsString, IsNumber, IsNotEmpty, Min, IsDateString, Length } from 'class-validator';

/**
 * Data Transfer Object untuk pendaftaran kunjungan wisata.
 * Berfungsi untuk memvalidasi input dari User Interface.
 */
export class CreateWisataDto {

    @IsDateString({}, { message: 'Format tanggal tidak valid' })
    @IsNotEmpty()
    Tanggal: string;

    @IsString()
    @IsNotEmpty({ message: 'Nama Pengunjung harus diisi' })
    @Length(3, 100)
    Nama: string; // Label UI: Nama Pengunjung

    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    Jumlah: number; // Representasi jumlah tiket/orang

    @IsNumber()
    @Min(0)
    @IsNotEmpty()
    Harga: number; // Nilai satuan atau total harga (sesuai UI)
}