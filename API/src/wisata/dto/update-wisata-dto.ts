import { IsString, IsNumber, IsOptional, Min, IsDateString, Length } from 'class-validator';

export class UpdateWisataDto {
    @IsDateString()
    @IsOptional()
    tanggal?: string;

    @IsString()
    @IsOptional()
    @Length(3, 100)
    nama?: string;

    @IsNumber()
    @Min(1)
    @IsOptional()
    jumlah?: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    hargaTiket?: number;
}