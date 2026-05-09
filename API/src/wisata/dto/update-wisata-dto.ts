import { IsString, IsNumber, IsOptional, Min, IsDateString, Length } from 'class-validator';

/**
 * Data Transfer Object untuk pembaruan data wisata.
 * Semua properti bersifat opsional untuk mendukung pembaruan parsial (Partial Update).
 */
export class UpdateWisataDto {

    @IsDateString({}, { message: 'Format tanggal baru tidak valid' })
    @IsOptional()
    Tanggal?: string;

    @IsString()
    @Length(3, 100)
    @IsOptional()
    Nama?: string; // Label UI: Nama Pengunjung

    @IsNumber()
    @Min(1)
    @IsOptional()
    Jumlah?: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    Harga?: number;
}