import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class WisataGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    
    // Memanggil fungsi authenticate yang ada di bawah
    return this.authenticate(request);
  }

  // Fungsi pengecekan kunci akses
  authenticate(request: any): boolean {
    // Di Express/NestJS, keys dari headers otomatis menjadi huruf kecil (lowercase)
    const authHeader = request.headers['authorization'];

    // Kunci rahasia CMS
    const KUNCI_RAHASIA = 'PuncakMasAdmin123';

    // Mendukung format "PuncakMasAdmin123" langsung atau "Bearer PuncakMasAdmin123"
    if (authHeader === KUNCI_RAHASIA || authHeader === `Bearer ${KUNCI_RAHASIA}`) {
      return true; // Pintu dibuka, boleh CRUD
    }

    // Jika kunci salah atau tidak ada, lempar error 401
    throw new UnauthorizedException('Akses Ditolak: Kunci CMS tidak valid!');
  }
}