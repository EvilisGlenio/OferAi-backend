import { Test, TestingModule } from '@nestjs/testing';
import { ScrapedItemsService } from './scraped-items.service';

describe('ScrapedItemsService', () => {
  let service: ScrapedItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScrapedItemsService],
    }).compile();

    service = module.get<ScrapedItemsService>(ScrapedItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
