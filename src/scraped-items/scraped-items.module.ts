import { Module } from '@nestjs/common';
import { ScrapedItemsService } from './scraped-items.service';
import { ScrapedItemsController } from './scraped-items.controller';

@Module({
  controllers: [ScrapedItemsController],
  providers: [ScrapedItemsService],
})
export class ScrapedItemsModule {}
