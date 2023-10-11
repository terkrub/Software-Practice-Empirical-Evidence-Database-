import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyapiController } from './myapi/myapi.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesModule } from './articles/article.module';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ArticlesModule,
    UsersModule,
    MongooseModule.forRoot('mongodb+srv://admin:1234@speed.sj1cypd.mongodb.net/?retryWrites=true&w=majority'),
  ],
  controllers: [AppController, MyapiController],
  providers: [AppService],
})
export class AppModule {}
