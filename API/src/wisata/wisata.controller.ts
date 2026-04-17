import { Controller, Get, Param, Post, Body, Patch, Delete, HttpCode, HttpStatus, NotFoundException, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CreateWisataDto } from './dto/create-wisata.dto';
import { UpdateWisataDto } from './dto/update-wisata-dto';
import { WisataService } from './wisata.service';
import { WisataGuard } from './wisata.guard';

@Controller('wisata')
export class WisataController {
    constructor(private wisataService: WisataService) { }

    @Get()
    findAll() {
        return this.wisataService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.wisataService.findOne(id);
    }

    @Post()
    @UseGuards(WisataGuard)
    create(@Body() createWisataDto: CreateWisataDto) {
        return this.wisataService.create(createWisataDto);
    }

    @Patch(':id')
    @UseGuards(WisataGuard)
    update( 
        @Param('id', ParseIntPipe) id: number,
        @Body() updateWisataDto: UpdateWisataDto
    ) {
        return this.wisataService.update(id, updateWisataDto);
    }

    @Delete(':id')
    @UseGuards(WisataGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseIntPipe) id: number) {
        this.wisataService.remove(id);
    }
}