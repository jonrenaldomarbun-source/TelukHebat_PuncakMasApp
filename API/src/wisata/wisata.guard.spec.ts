import { WisataGuard } from './wisata.guard';

/**
 * File pengujian untuk memastikan sistem keamanan (Guard) bisa berjalan.
 */
describe('WisataGuard', () => {
  
  // Tes sederhana: Memastikan objek penjaga (Guard) berhasil dibuat
  it('shoould be defined', () => {
    // Kita coba panggil/buat "Satpam" baru, lalu cek apakah dia ada (tidak error)
    expect(new WisataGuard()).toBeDefined();
  });

});