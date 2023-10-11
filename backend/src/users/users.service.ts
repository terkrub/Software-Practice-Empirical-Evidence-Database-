import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<any>,
      ) {}

      async login(info: any): Promise<any> {
        console.log(info)
        const existingUser = await this.userModel.findOne({ email: info.email }).exec();
    
        if (existingUser) {
          if(existingUser.password == info.password){
            return{stus:"Success"}
          }
          return{stus:"Fail", message:"email/password Incorrect"}
        }
        return {stus:"Fail", message:"email/password Incorrect"}
      }
    
      async register(info: any): Promise<any> {
        console.log(info)
        const existingUser = await this.userModel.findOne({ email: info.email }).exec();
    
        if (existingUser) {
          return{stus:"Fail", message:"This email already used"}
        }
    
        const createdUser = new this.userModel(info);
        return {stus:"Success",data:createdUser.save()};
      }
}
