import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsUrl,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateScrapedItemDto {
  @ApiProperty({
    description: 'Título do item a ser cadastrado',
    example: 'Processador Ryzen 5 5600X',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'A descrição do item a ser cadastrado',
    example: 'Processador de 6 núcleos e 12 threads',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Preço do item a ser cadastrado',
    example: 429.99,
    type: Number,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'URL da imagem do item a ser cadastrado',
    example: 'https://oferai.com/image.jpg',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsUrl()
  imageUrl: string;

  @ApiProperty({
    description: 'URL do produto do item a ser cadastrado',
    example: 'https://oferai.com/processador-ryzen-5-5600x',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsUrl()
  productUrl: string;

  @ApiProperty({
    description: 'Categoria do item a ser cadastrado',
    example: 'Eletrônicos',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  category?: string;
}
