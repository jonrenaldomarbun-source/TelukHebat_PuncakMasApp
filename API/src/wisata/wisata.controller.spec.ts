import { Test, TestingModule } from '@nestjs/testing';
import { WisataController } from './wisata.controller';

/**
 * File pengujian untuk mengecek apakah WisataController berfungsi dengan normal.
 */
describe('WisataController', () => {
  let controller: WisataController;

  // Bagian persiapan: dijalankan setiap kali sebelum memulai satu tes
  beforeEach(async () => {
    // 1. Membuat 'kotak simulasi' (module) agar kita bisa mengetes WisataController secara terpisah
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WisataController],
    }).compile();

    // 2. Mengambil objek WisataController yang sudah siap pakai dari dalam kotak simulasi
    controller = module.get<WisataController>(WisataController);
  });

  // Tes paling dasar: mengecek apakah kontroler sudah ada dan tidak kosong (error)
  it('should be defined', () => {
    expect(controller).toBeDefined(); // "Ekspektasinya, kontroler ini harus ada nilainya"
  });
});