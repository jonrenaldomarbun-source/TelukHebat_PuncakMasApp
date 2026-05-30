import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'; // 1. Ambil JwtService bawaan NestJS

/**
 * WisataGuard sekarang menjadi Satpam Digital berbasis Token JWT.
 * Menggantikan sistem kunci statis 'Admin123' menjadi kunci dinamis hasil login admin.
 */
@Injectable()
export class WisataGuard implements CanActivate {
  
  // 2. Suntikkan JwtService ke dalam constructor satpam
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.authenticate(request);
  }

  async authenticate(request: any): Promise<boolean> {
    const authHeader = request.headers['authorization'];

    // Cek apakah tamu membawa token di headernya
    if (!authHeader) {
      throw new UnauthorizedException('Akses Ditolak: Token tidak ditemukan! Silakan login dulu.');
    }

    // Memisahkan kata 'Bearer' dengan Token aslinya
    // Contoh: "Bearer eyJhbGciOi..." -> ["Bearer", "eyJhbGciOi..."]
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new UnauthorizedException('Akses Ditolak: Format token salah (Harus menggunakan format Bearer)!');
    }

    const token = parts[1];

    try {
      // 3. Satpam memeriksa validitas token menggunakan Kunci Rahasia JWT Admin
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'KUNCI_RAHASIA_ADMIN', // Harus sama persis dengan secret di AuthModule
      });

      // Menempelkan data identitas Admin ke dalam request (jika nanti butuh di controller)
      request['admin'] = payload;

      return true; // Token sah! Admin diizinkan melakukan CRUD wisata
    } catch (error) {
      // Jika token kedaluwarsa (lewat 1 hari) atau hasil manipulasi
      throw new UnauthorizedException('Akses Ditolak: Token kedaluwarsa atau tidak valid!');
    }
  }
}