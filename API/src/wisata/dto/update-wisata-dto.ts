import { IsString, IsNumber, IsOptional, Min, IsDateString, Length } from 'class-validator';

export class UpdateWisataDto {
    @IsDateString()
    @IsOptional()
    Tanggal?: string;

    @IsString()
    @IsOptional()
    @Length(3, 100)
    Nama?: string;

    @IsNumber()
    @Min(1)
    @IsOptional()
    Jumlah?: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    Harga?: number;
}