import { Module } from '@nestjs/common';
import { WisataController } from './wisata.controller';

@Module({
  controllers: [WisataController]
})
export class WisataModule {}
