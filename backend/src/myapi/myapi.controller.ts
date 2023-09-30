import { Controller, Post, Body } from '@nestjs/common';

@Controller('myapi')
export class MyApiController {
  @Post('test')
  handleTest(@Body() body: any): string {
    return 'POST request received!';
  }
}
