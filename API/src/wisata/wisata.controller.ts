import { Controller, Get, Param, Post, Body, Patch, Delete, HttpCode, HttpStatus, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CreateWisataDto } from './dto/create-wisata.dto';
import { UpdateWisataDto } from './dto/update-wisata-dto';
import { WisataService } from './wisata.service';
import { WisataGuard } from './wisata.guard';

// Alamat utama untuk akses data wisata: domainanda.com/wisata
@Controller('wisata')
export class WisataController {
    // Menghubungkan ke 'WisataService' yang berisi logika cara mengolah data
    constructor(private wisataService: WisataService) { }

    // Ambil semua daftar wisata
    @Get()
    findAll() {
        return this.wisataService.findAll();
    }

    // Cari satu data wisata berdasarkan ID
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        // ParseIntPipe bertugas memastikan ID yang diketik adalah angka
        return this.wisataService.findOne(id);
    }

    // Tambah data wisata baru (Hanya untuk yang punya izin/Guard)
    @Post()
    @UseGuards(WisataGuard)
    create(@Body() createWisataDto: CreateWisataDto) {
        return this.wisataService.create(createWisataDto);
    }

    // Ubah sebagian data wisata berdasarkan ID (Hanya untuk yang punya izin/Guard)
    @Patch(':id')
    @UseGuards(WisataGuard)
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateWisataDto: UpdateWisataDto
    ) {
        return this.wisataService.update(id, updateWisataDto);
    }

    // Hapus data wisata (Hanya untuk yang punya izin/Guard)
    @Delete(':id')
    @UseGuards(WisataGuard)
    @HttpCode(HttpStatus.NO_CONTENT) // Jika berhasil hapus, kirim kode sukses tapi tanpa data (204)
    remove(@Param('id', ParseIntPipe) id: number) {
        this.wisataService.remove(id);
    }
}