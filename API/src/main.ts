import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Aktifkan CORS agar CMS Jon bisa akses
  app.enableCors(); 

  // 2. Setup Pipe agar modern dan otomatis convert tipe data
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, 
    forbidNonWhitelisted: false,
    transform: true, 
    transformOptions: {
      enableImplicitConversion: true, 
    },
  }));

  // 3. Jalankan Server
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`Server runs on: http://localhost:${port}`);
}
bootstrap();