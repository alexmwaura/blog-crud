import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articeRepository: Repository<Article>,
  ) {}

  async create(article: CreateArticleDto): Promise<Article> {
    const artl = this.articeRepository.create(article);
    return this.articeRepository.save(artl);
  }

  findAll(): Promise<Article[]> {
    return this.articeRepository.find({ relations: ['comments'] });
  }

  findOne(id: string) {
    return this.articeRepository.findOne(id);
  }

  async update(
    id: string,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    const artl = await this.articeRepository.preload({
      id: id,
      ...updateArticleDto,
    });
    if (!artl) {
      throw new NotFoundException(`Article ${id} not found`);
    }
    return this.articeRepository.save(artl);
  }

  async remove(id: string) {
    const artl = await this.findOne(id);
    return this.articeRepository.remove(artl);
  }
}
