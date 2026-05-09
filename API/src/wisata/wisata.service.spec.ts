import { Test, TestingModule } from '@nestjs/testing';
import { WisataService } from './wisata.service';

/**
 * File pengujian khusus untuk mengecek WisataService.
 * Kita ingin memastikan "mesin utama" pengolah data wisata tidak rusak.
 */
describe('WisataService', () => {
  let service: WisataService;

  // Ritual persiapan: Dijalankan setiap kali sebelum melakukan pengetesan
  beforeEach(async () => {
    // 1. Membuat 'ruangan simulasi' untuk menaruh WisataService
    const module: TestingModule = await Test.createTestingModule({
      providers: [WisataService],
    }).compile();

    // 2. Mengambil WisataService yang sudah siap dari dalam ruangan simulasi tersebut
    service = module.get<WisataService>(WisataService);
  });

  // Tes dasar: Mengecek apakah servisnya berhasil dibuat atau tidak
  it('should be defined', () => {
    // "Saya berharap servis ini ada (terdefinisi) dan tidak error saat dipanggil"
    expect(service).toBeDefined();
  });
});