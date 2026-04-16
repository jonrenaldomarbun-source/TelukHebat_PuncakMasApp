import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Tambahkan whitelist: true
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, 
    forbidNonWhitelisted: true // (Opsional) Langsung error 400 jika ada field asing
  }));
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();