import { Injectable } from '@nestjs/common';
import { CreateScrapedItemDto } from './dto/create-scraped-item.dto';
import { UpdateScrapedItemDto } from './dto/update-scraped-item.dto';

@Injectable()
export class ScrapedItemsService {
  create(createScrapedItemDto: CreateScrapedItemDto) {
    return 'This action adds a new scrapedItem';
  }

  findAll() {
    return `This action returns all scrapedItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} scrapedItem`;
  }

  update(id: number, updateScrapedItemDto: UpdateScrapedItemDto) {
    return `This action updates a #${id} scrapedItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} scrapedItem`;
  }
}
