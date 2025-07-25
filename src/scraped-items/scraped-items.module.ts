import { Module } from '@nestjs/common';
import { ScrapedItemsService } from './scraped-items.service';
import { ScrapedItemsController } from './scraped-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScrapedItem } from './entities/scraped-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScrapedItem])], // Informa ao módulo sobre a entidade ScrapedItem
  controllers: [ScrapedItemsController],
  providers: [ScrapedItemsService],
})
export class ScrapedItemsModule {}
