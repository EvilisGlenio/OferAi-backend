import { Test, TestingModule } from '@nestjs/testing';
import { ScrapedItemsService } from './scraped-items.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ScrapedItem } from './entities/scraped-item.entity';
import { Repository } from 'typeorm';
import { CreateScrapedItemDto } from './dto/create-scraped-item.dto';

// Define um tipo explícito para o nosso repositório mockado.
// Isso resolve os erros de tipo do TypeScript:
// 1. Evita o erro de restrição de genéricos (generic constraint) do TypeORM.
// 2. Garante que os métodos mockados não são 'undefined', pois não usamos `Partial`.
type MockRepository = {
  create: jest.Mock;
  save: jest.Mock;
  find: jest.Mock;
  findOne: jest.Mock;
  preload: jest.Mock;
  delete: jest.Mock;
};

const createMockRepository = (): MockRepository => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  preload: jest.fn(),
  delete: jest.fn(),
});

describe('ScrapedItemsService', () => {
  let service: ScrapedItemsService;
  let repository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScrapedItemsService,
        {
          provide: getRepositoryToken(ScrapedItem),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<ScrapedItemsService>(ScrapedItemsService);
    repository = module.get<MockRepository>(getRepositoryToken(ScrapedItem));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a new scraped item successfully', async () => {
      // Arrange: Preparar os dados e os mocks
      const createDto: CreateScrapedItemDto = {
        title: 'Test Product',
        price: 99.99,
        imageUrl: 'http://example.com/image.jpg',
        productUrl: 'http://example.com/product',
      };

      const expectedResult = {
        id: 'some-uuid',
        ...createDto,
        lastScrapedAt: new Date(),
      };

      repository.create.mockReturnValue(createDto);
      repository.save.mockResolvedValue(expectedResult);

      // Act: Chamar o método que está sendo testado
      const result = await service.create(createDto);

      // Assert: Verificar se o resultado é o esperado e se os mocks foram chamados
      expect(repository.create).toHaveBeenCalledWith(createDto);
      expect(repository.save).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(expectedResult);
    });
  });
});
