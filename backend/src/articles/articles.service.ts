import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ArticlesService {
  constructor(@InjectModel('Article') private articleModel: Model<any>) {}

  async create(article: any): Promise<any> {
    // Check if an article with the same DOI already exists
    console.log(article)
    const existingArticle = await this.articleModel.findOne({ doi: article.doi }).exec();

    // If it does, mark isDuplicate as true
    if (existingArticle) {
      article.isDuplicate = true;
    }

    const createdArticle = new this.articleModel(article);
    return createdArticle.save();
  }

  async findAll(): Promise<any[]> {
    return this.articleModel.find().exec();
  }

  async approveArticle(articleId: string): Promise<void> {
    // Logic to approve an article (e.g., set modCheck to true)
    const updatedArticle = await this.articleModel.updateOne({ _id: articleId }, { modCheck: true });
  }

  async rejectArticle(articleId: string): Promise<void> {
    // Logic to reject an article (e.g., move to a different table or set a flag)
    // Example:
    // const article = await this.articleModel.findById(articleId);
    // await this.rejectedArticleModel.create(article);
    // await this.articleModel.deleteOne({ _id: articleId });
  }
}
