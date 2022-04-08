import { Article } from 'src/article/entities/article.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'username', type: 'varchar', nullable: false })
  username: string;

  @Column({ name: 'message', type: 'varchar', nullable: false })
  message: string;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ name: 'articleId', type: 'uuid', nullable: false })
  articleId: string;

  @ManyToOne(() => Article, (article) => article.comments, {
    eager: false,
    onDelete: 'CASCADE',
  })
  article: Article;
}
