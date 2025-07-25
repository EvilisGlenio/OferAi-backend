import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ScrapedItemsService } from './scraped-items.service';
import { CreateScrapedItemDto } from './dto/create-scraped-item.dto';
import { UpdateScrapedItemDto } from './dto/update-scraped-item.dto';
import { ScrapedItem } from './entities/scraped-item.entity';

@Controller('scraped-items')
export class ScrapedItemsController {
  constructor(private readonly scrapedItemsService: ScrapedItemsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED) // Retorna 201 Created
  async create(
    @Body() createScrapedItemDto: CreateScrapedItemDto,
  ): Promise<ScrapedItem> {
    return this.scrapedItemsService.create(createScrapedItemDto);
  }

  @Get()
  async findAll(): Promise<ScrapedItem[]> {
    return this.scrapedItemsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ScrapedItem> {
    return this.scrapedItemsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateScrapedItemDto: UpdateScrapedItemDto,
  ): Promise<ScrapedItem> {
    return this.scrapedItemsService.update(id, updateScrapedItemDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Retorna 204 No Content para deleção bem-sucedida
  async remove(@Param('id') id: string): Promise<void> {
    return this.scrapedItemsService.remove(id);
  }
}
