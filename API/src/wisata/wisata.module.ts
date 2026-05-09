import { Module } from '@nestjs/common';
import { WisataController } from './wisata.controller';
import { WisataService } from './wisata.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wisata } from './entities/wisata.entity';

/**
 * WisataModule adalah wadah besar yang menyatukan 
 * database, pengatur rute, dan logika bisnis wisata.
 */
@Module({
  // 1. IMPORT: Menghubungkan modul ini ke tabel 'Wisata' di database (Wajib!)
  imports: [TypeOrmModule.forFeature([Wisata])], 

  // 2. CONTROLLERS: Menentukan siapa yang akan menerima tamu (request HTTP)
  controllers: [WisataController],

  // 3. PROVIDERS: Menentukan siapa yang akan mengerjakan tugas berat (logika data)
  providers: [WisataService],
})
export class WisataModule {}