import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, 
    forbidNonWhitelisted: true,
    // TAMBAHKAN INI:
    transform: true, 
    transformOptions: {
      enableImplicitConversion: true, // Otomatis mengubah string '5' menjadi number 5
    },
  }));
  
  await app.listen(process.env.PORT ?? 3000);
  console.log('Server runs on: http://localhost:3000');
}
bootstrap();