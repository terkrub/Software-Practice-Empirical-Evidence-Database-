import { Controller, Post, Body } from '@nestjs/common';

@Controller('myapi')
export class MyapiController {
    @Post()
    create(@Body() body: any): string {
        const name = body.name;
        return `Received name: ${name}`;
    }
}
