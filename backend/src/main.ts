import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { AppModule } from './app.module';

const server = express();

async function createNestApp() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  await app.init();
}

createNestApp();

export = server;
