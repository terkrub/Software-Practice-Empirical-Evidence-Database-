import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RejectedArticleSchema } from './rejected-article.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'RejectedArticle', schema: RejectedArticleSchema }]),
  ],
})
export class RejectedArticleModule {}