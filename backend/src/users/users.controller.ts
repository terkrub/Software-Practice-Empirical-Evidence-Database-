import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

  @Post('/login')
  async create(@Body() info : any) {
    return this.userService.login(info);
  }

  @Post('/register')
  async rejectArticle(@Body() info: any) {
    return this.userService.register(info);
  }
}
