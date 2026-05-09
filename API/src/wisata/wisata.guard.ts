import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

/**
 * WisataGuard adalah "Satpam" digital.
 * Gunanya untuk mencegat tamu yang ingin menambah, mengubah, atau menghapus data.
 */
@Injectable()
export class WisataGuard implements CanActivate {
  
  // Fungsi utama: "Boleh masuk tidak?"
  canActivate(context: ExecutionContext): boolean {
    // 1. Ambil data tamu yang datang (request)
    const request = context.switchToHttp().getRequest();
    
    // 2. Suruh satpam cek kunci aksesnya
    return this.authenticate(request);
  }

  // Fungsi pengecekan kunci akses
  authenticate(request: any): boolean {
    // Mengambil 'catatan' dari tamu di bagian 'authorization' (biasanya di Header)
    const authHeader = request.headers['authorization'];

    // Ini adalah password rahasia yang harus dibawa tamu
    const KUNCI_RAHASIA = 'Admin123';

    // Cek apakah tamu membawa kunci yang tepat?
    // Bisa dalam bentuk "Admin123" saja, atau "Bearer Admin123"
    if (authHeader === KUNCI_RAHASIA || authHeader === `Bearer ${KUNCI_RAHASIA}`) {
      return true; // Kunci cocok! Silakan masuk (CRUD diizinkan)
    }

    // Jika kunci salah atau tamu tidak bawa kunci sama sekali
    throw new UnauthorizedException('Akses Ditolak: Kunci CMS tidak valid!');
  }
}