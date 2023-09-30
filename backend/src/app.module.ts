import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyapiController } from './myapi/myapi.controller';

@Module({
  imports: [],
  controllers: [AppController, MyapiController],
  providers: [AppService],
})
export class AppModule {}
