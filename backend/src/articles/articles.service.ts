import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel('Article') private readonly articleModel: Model<any>,
    @InjectModel('RejectedArticle') private readonly rejectedArticleModel: Model<any>,
  ) {}

  async updateArticle(articleId: string, updateData: any): Promise<any> {
    const updatedArticle = await this.articleModel.findByIdAndUpdate(articleId, updateData, {
      new: true,  // return the updated document
      runValidators: true, // validate the update against the schema
    }).exec();

    if (!updatedArticle) {
      throw new NotFoundException(`Article with ID ${articleId} not found`);
    }

    return updatedArticle;
  }

  async create(article: any): Promise<any> {
    // Check if an article with the same DOI already exists
    console.log(article)
    const existingArticle = await this.articleModel.findOne({ doi: article.title }).exec();

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

  async modApproveArticle(articleId: string): Promise<void> {
    // Logic to approve an article (e.g., set modCheck to true)
    const updatedArticle = await this.articleModel.updateOne({ _id: articleId }, { modCheck: true });
  }

  async approveArticle(articleId: string): Promise<void> {
    // Logic to approve an article (e.g., set modCheck to true)
    const updatedArticle = await this.articleModel.updateOne({ _id: articleId }, { approve: true });
  }

  async rejectArticle(articleId: string): Promise<void> {
    try {
      // Find and log the article
      const article = await this.articleModel.findOne({ _id: articleId }).lean();
      console.log(article);
  
      // Check if the article was found
      if (!article) {
        throw new NotFoundException(`Article with ID ${articleId} not found`);
      }
  
      // Create a new rejected article without _id and __v from the original article
      const rejectTable = new this.rejectedArticleModel({
        ...article,
        _id: undefined,
        __v: undefined,
      });
  
      // Save the rejected article
      await rejectTable.save();
  
      // Delete the original article
      await this.articleModel.deleteOne({ _id: articleId });
    } catch (error) {
      // Log the error and rethrow it or handle it as appropriate
      console.error(error);
      throw new InternalServerErrorException('Error rejecting article');
    }
  }
}