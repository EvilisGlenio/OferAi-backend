import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('scraped_items') // Nome da tabela no banco de dados
export class ScrapedItem {
  @PrimaryGeneratedColumn('uuid') // Gera um UUID como chave primária
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column()
  @Index() // Índice para buscas mais rápidas
  imageUrl: string;

  @Column({ unique: true }) // Garante que cada URL seja única
  @Index()
  productUrl: string;

  @Column({ nullable: true })
  category?: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  lastScrapedAt: Date;
}
