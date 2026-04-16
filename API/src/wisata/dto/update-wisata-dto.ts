import { MinLength, IsString, IsNumber, IsArray, IsOptional, Min } from 'class-validator';

export class UpdateWisataDto {
    @IsString()
    @IsOptional() // Ganti IsNotEmpty jadi IsOptional
    @MinLength(3)
    nama?: string; // Tambahkan tanda tanya (?) agar TypeScript tahu ini opsional

    @IsString()
    @IsOptional()
    lokasi?: string;

    @IsString()
    @IsOptional()
    deskripsi?: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    fasilitas?: string[];

    @IsNumber()
    @Min(0)
    @IsOptional()
    hargaTiket?: number;

    @IsString()
    @IsOptional()
    jamBuka?: string;

    @IsNumber()
    @IsOptional()
    pengunjung?: number;
}