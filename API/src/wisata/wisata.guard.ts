import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class WisataGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    
    // Memanggil fungsi authenticate yang ada di bawah
    return this.authenticate(request);
  }

  // Fungsi pengecekan kunci akses
  authenticate(request: any): boolean {
    const authHeader = request.headers['authorization'];

    // Kita tentukan kunci rahasia untuk CMS kamu
    const KUNCI_RAHASIA = 'PuncakMasAdmin123';

    if (authHeader === KUNCI_RAHASIA) {
      return true; // Pintu dibuka, boleh CRUD
    }

    // Jika kunci salah atau tidak ada, lempar error 401
    throw new UnauthorizedException('Akses Ditolak: Kunci CMS tidak valid!');
  }
}
