import { Controller, Post, Body } from '@nestjs/common';

@Controller('myapi')
export class MyapiController {
    @Post('test')
    create(@Body() body: any): string {
        const name = body.name;
        return `Received name: ${name}`;
    }
}
