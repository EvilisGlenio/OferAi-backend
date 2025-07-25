import { Test, TestingModule } from '@nestjs/testing';
import { ScrapedItemsController } from './scraped-items.controller';
import { ScrapedItemsService } from './scraped-items.service';
import { CreateScrapedItemDto } from './dto/create-scraped-item.dto';

describe('ScrapedItemsController', () => {
  let controller: ScrapedItemsController;
  let service: ScrapedItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScrapedItemsController],
      providers: [
        // Para testar o controller de forma isolada, mockamos o serviço.
        // Não queremos testar a lógica do serviço aqui, apenas se o controller o chama corretamente.
        {
          provide: ScrapedItemsService,
          useValue: {
            create: jest.fn().mockResolvedValue({}), // Mock para o método create
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<ScrapedItemsController>(ScrapedItemsController);
    service = module.get<ScrapedItemsService>(ScrapedItemsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the create method on the service with the correct data', async () => {
    const createDto: CreateScrapedItemDto = {
      title: 'Test',
      price: 10,
      imageUrl: 'url',
      productUrl: 'url',
    };
    await controller.create(createDto);
    expect(service.create).toHaveBeenCalledWith(createDto);
  });
});
