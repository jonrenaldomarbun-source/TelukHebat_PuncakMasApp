import { Controller, Get, Query, Param, Post, Body, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateWisataDto } from './dto/create-wisata.dto';
import { UpdateWisataDto } from './dto/update-wisata-dto';

@Controller('wisata')
export class WisataController {

    @Get()
    findAll(@Query('nama') nama?: string) {
        return [
            {
                id: 1,
                nama: "Puncak Mas",
                lokasi: "Lampung",
                deskripsi: "Wisata Bagus",
                fasilitas: ["Spot Foto", "Cafe"],
                hargaTiket: 20000,
                jamBuka: "08:00",
                pengunjung: 120
            },
            {
                id: 2,
                nama: "Puncak Mas 2",
                lokasi: "Lampung",
                deskripsi: "Pemandangan Kota",
                fasilitas: ["Mushola", "Parkir"],
                hargaTiket: 15000,
                jamBuka: "09:00",
                pengunjung: 80
            }
        ];
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return {
            id,
            nama: "Puncak Mas",
            lokasi: "Lampung",
            deskripsi: "Wisata Bagus",
            fasilitas: ["Spot Foto", "Cafe"],
            hargaTiket: 20000,
            jamBuka: "08:00",
            pengunjung: 120
        };
    }

    @Post()
    create(@Body() createWisataDto: CreateWisataDto) {
        return {
            nama: createWisataDto.nama,
            lokasi: createWisataDto.lokasi,
            deskripsi: createWisataDto.deskripsi,
            fasilitas: createWisataDto.fasilitas,
            hargaTiket: createWisataDto.hargaTiket,
            jamBuka: createWisataDto.jamBuka,
            pengunjung: createWisataDto.pengunjung
        };
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateWisataDto: UpdateWisataDto
    ) {
        return {
            id,
            ...updateWisataDto
        };
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string) { }
}