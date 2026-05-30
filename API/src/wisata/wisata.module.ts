import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt'; // 1. Import JwtModule
import { WisataService } from './wisata.service';
import { WisataController } from './wisata.controller';
import { Wisata } from './entities/wisata.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wisata]),
    // 2. Daftarkan JwtModule dengan secret yang sama agar service-nya bisa dibaca oleh WisataGuard
    JwtModule.register({
      secret: 'KUNCI_RAHASIA_ADMIN',
    }),
  ],
  controllers: [WisataController],
  providers: [WisataService], // WisataGuard otomatis ikut terbaca karena dipakai di Controller
})
export class WisataModule {}