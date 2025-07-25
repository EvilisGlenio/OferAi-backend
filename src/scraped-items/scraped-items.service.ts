import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateScrapedItemDto } from './dto/create-scraped-item.dto';
import { UpdateScrapedItemDto } from './dto/update-scraped-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ScrapedItem } from './entities/scraped-item.entity';
import { Repository } from 'typeorm';

/**
 * Serviço responsável por gerenciar operações CRUD de itens raspados.
 */
@Injectable()
export class ScrapedItemsService {
  constructor(
    @InjectRepository(ScrapedItem)
    private readonly scrapedItemRepository: Repository<ScrapedItem>,
  ) {}

  /**
   * Cria um novo item raspado a partir de um DTO.
   * @param createScrapedItemDto Dados do item a ser criado
   * @returns Promessa com o item criado
   */
  async create(
    createScrapedItemDto: CreateScrapedItemDto,
  ): Promise<ScrapedItem> {
    const newItem = this.scrapedItemRepository.create(createScrapedItemDto);
    // A validação do DTO é feita pelo ValidationPipe do NestJS, tornando a verificação de nulidade aqui redundante.
    return this.scrapedItemRepository.save(newItem);
  }

  /**
   * Retorna todos os itens raspados.
   * @returns Promessa com a lista de itens
   */
  async findAll(): Promise<ScrapedItem[]> {
    return this.scrapedItemRepository.find();
  }

  /**
   * Busca um item raspado pelo ID.
   * @param id ID do item (string UUID)
   * @returns Promessa com o item
   * @throws NotFoundException se o item não for encontrado
   */
  async findOne(id: string): Promise<ScrapedItem> {
    const item = await this.scrapedItemRepository.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Item com ID ${id} não encontrado`);
    }
    return item;
  }

  /**
   * Atualiza um item raspado pelo ID.
   * @param id ID do item (UUID)
   * @param updateScrapedItemDto Dados atualizados do item
   * @returns Promessa com o item atualizado
   * @throws NotFoundException se o item não for encontrado
   */
  async update(
    id: string,
    updateScrapedItemDto: UpdateScrapedItemDto,
  ): Promise<ScrapedItem> {
    // `preload` cria uma nova entidade com base no objeto passado.
    // Ele carrega a entidade do banco de dados, mescla os novos valores e retorna a nova entidade.
    // Se o ID não existir no banco de dados, ele retorna undefined.
    const item = await this.scrapedItemRepository.preload({
      id: id,
      ...updateScrapedItemDto,
    });
    if (!item) {
      throw new NotFoundException(`Item com ID ${id} não encontrado`);
    }
    return this.scrapedItemRepository.save(item); // Salva a entidade mesclada e retorna o item atualizado.
  }

  /**
   * Remove um item raspado pelo ID.
   * @param id ID do item (string UUID)
   * @returns Promessa que indica sucesso da operação
   * @throws NotFoundException se o item não for encontrado
   */
  async remove(id: string): Promise<void> {
    const result = await this.scrapedItemRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Item com ID ${id} não encontrado`);
    }
  }
}
