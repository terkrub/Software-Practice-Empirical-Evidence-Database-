import { Controller, Get, Post, Body } from '@nestjs/common';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  async create(@Body() article: any) {
    return this.articlesService.create(article);
  }

  @Get()
  async findAll() {
    return this.articlesService.findAll();
  }
}
