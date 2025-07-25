import { PartialType } from '@nestjs/mapped-types';
import { CreateScrapedItemDto } from './create-scraped-item.dto';

export class UpdateScrapedItemDto extends PartialType(CreateScrapedItemDto) {}
