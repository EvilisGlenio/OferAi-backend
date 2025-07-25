import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ScrapedItemsService } from './scraped-items.service';
import { CreateScrapedItemDto } from './dto/create-scraped-item.dto';
import { UpdateScrapedItemDto } from './dto/update-scraped-item.dto';

@Controller('scraped-items')
export class ScrapedItemsController {
  constructor(private readonly scrapedItemsService: ScrapedItemsService) {}

  @Post()
  create(@Body() createScrapedItemDto: CreateScrapedItemDto) {
    return this.scrapedItemsService.create(createScrapedItemDto);
  }

  @Get()
  findAll() {
    return this.scrapedItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scrapedItemsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() UpdateScrapedItemDto: UpdateScrapedItemDto,
  ) {
    return this.scrapedItemsService.update(+id, UpdateScrapedItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scrapedItemsService.remove(+id);
  }
}
