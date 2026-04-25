import { Module } from '@nestjs/common';
import { WisataController } from './wisata.controller';
import { WisataService } from './wisata.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wisata } from './entities/wisata.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wisata])], // WAJIB ADA
  controllers: [WisataController],
  providers: [WisataService],
})
export class WisataModule {}
