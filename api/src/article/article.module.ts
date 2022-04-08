import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { CommentModule } from 'src/comment/comment.module';

@Module({
  imports: [TypeOrmModule.forFeature([Article]), CommentModule],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
