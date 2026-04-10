import { Controller, Get, Param, Post, Body, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateWisataDto } from './dto/create-wisata.dto';
import { UpdateWisataDto } from './dto/update-wisata-dto';
import { WisataService } from './wisata.service';

@Controller('wisata')
export class WisataController {
    constructor(private wisataService: WisataService) {}

    @Get()
    findAll() {
        return this.wisataService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.wisataService.findOne(id);
    }

    @Post()
    create(@Body() createWisataDto: CreateWisataDto) {
        return this.wisataService.create(createWisataDto);
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