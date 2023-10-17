import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  async create(@Body() article: any) {
    return this.articlesService.create(article.article);
  }

  @Get()
  async findAll() {
    return this.articlesService.findAll();
  }

  @Post(':id/modchecked')
  async modApproveArticle(@Param('id') id: string) {
    return this.articlesService.modApproveArticle(id);
  }

  @Post(':id/approve')
  async approveArticle(@Param('id') id: string) {
    return this.articlesService.approveArticle(id);
  }

  @Post(':id/reject')
  async rejectArticle(@Param('id') id: string) {
    return this.articlesService.rejectArticle(id);
  }

  @Post(':id/update')
  async updateArticle(@Param('id') id: string, @Body() article: any) {
    return this.articlesService.updateArticle(id,article.article);
  }

  @Post(':id/delete')
  async deletedArticle(@Param('id') id: string) {
    return this.articlesService.deletedArticle(id);
  }
}

