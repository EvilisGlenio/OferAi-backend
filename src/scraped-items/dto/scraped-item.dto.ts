export class ScrapedItemDto {
  id: string;
  title: string;
  description?: string;
  price: number;
  imageUrl: string;
  productUrl: string;
  category?: string;
  lastScrapedAt: Date;
}
