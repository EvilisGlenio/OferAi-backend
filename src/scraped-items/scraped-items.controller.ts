import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
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
    // O ID é um UUID (string), não um número. A conversão `+id` estava incorreta.
    return this.scrapedItemsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateScrapedItemDto: UpdateScrapedItemDto, // Corrigido para a convenção de nomenclatura (camelCase)
  ) {
    return this.scrapedItemsService.update(id, updateScrapedItemDto);
  }

  @Delete(':id')
  @HttpCode(204) // Retorna '204 No Content' em caso de sucesso, que é o padrão para DELETE.
  remove(@Param('id') id: string) {
    return this.scrapedItemsService.remove(id);
  }
}
