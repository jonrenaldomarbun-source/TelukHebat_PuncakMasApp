    import { Controller, Get, Query, Param, Post, Body } from '@nestjs/common';
    import { CreateWisataDto } from './dto/create-wisata.dto';

    @Controller('wisata')
    export class WisataController {

        @Get()
        findAll(@Query('nama') nama?: string) {
            return [
                {
                    id: 1,
                    nama: "Puncak Mas",
                    lokasi: "Lampung",
                    pengunjung: 120
                },
                {
                    id: 2,
                    nama: "Puncak Mas 2",
                    lokasi: "Lampung",
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
                pengunjung: 120
            };
        }

        @Post()
        create(@Body() createWisataDto: CreateWisataDto) {
            return CreateWisataDto;
        }

    }