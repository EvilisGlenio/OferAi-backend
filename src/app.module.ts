import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScrapedItemsModule } from './scraped-items/scraped-items.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Opcional: torna o ConfigModule global
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true, // ATENÇÃO: APENAS PARA DESENVOLVIMENTO! NUNCA EM PRODUÇÃO!
      }),
      inject: [ConfigService], // Injeta o ConfigService no useFactory
    }),
    ScrapedItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
