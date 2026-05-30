import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity'; 
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin) 
    private adminRepository: Repository<Admin>,
    private jwtService: JwtService,
  ) { }

  // Fitur Registrasi Admin Baru
  async register(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const adminExist = await this.adminRepository.findOne({ where: { username } });
    if (adminExist) {
      throw new ConflictException('Username admin sudah digunakan');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = this.adminRepository.create({
      username,
      password: hashedPassword,
    });

    await this.adminRepository.save(admin);
    return { message: 'Registrasi Admin berhasil' };
  }

  // Fitur Login Admin
  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const admin = await this.adminRepository.findOne({ where: { username } });

    if (admin && (await bcrypt.compare(password, admin.password))) {
      const payload = { id: admin.id, username: admin.username, role: 'admin' }; // Tambah payload role jika butuh

      const accessToken = this.jwtService.sign(payload);
      return { access_token: accessToken };
    }

    throw new UnauthorizedException('Username atau password Admin salah');
  }
}