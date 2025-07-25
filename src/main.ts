import 'reflect-metadata'; // ESSENCIAL: Deve ser a primeira importação
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades não permitidas
      transform: true, // Transforma payloads em instâncias DTO
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
