import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentrepository: Repository<Comment>,
  ) {}

  async create(comment: CreateCommentDto): Promise<Comment> {
    const com = this.commentrepository.create(comment);
    return this.commentrepository.save(com);
  }

  findAll(): Promise<Comment[]> {
    return this.commentrepository.find();
  }

  findOne(id: string) {
    return this.commentrepository.findOne(id);
  }

  async update(
    id: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    const comment = await this.commentrepository.preload({
      id: id,
      ...updateCommentDto,
    });
    if (!comment) {
      throw new NotFoundException(`Article ${id} not found`);
    }
    return this.commentrepository.save(comment);
  }

  async remove(id: string) {
    const comment = await this.findOne(id);
    return this.commentrepository.remove(comment);
  }
}
