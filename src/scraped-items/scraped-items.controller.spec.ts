import { Test, TestingModule } from '@nestjs/testing';
import { ScrapedItemsController } from './scraped-items.controller';
import { ScrapedItemsService } from './scraped-items.service';

describe('ScrapedItemsController', () => {
  let controller: ScrapedItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScrapedItemsController],
      providers: [ScrapedItemsService],
    }).compile();

    controller = module.get<ScrapedItemsController>(ScrapedItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
