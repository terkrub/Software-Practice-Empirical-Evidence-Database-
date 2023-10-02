import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true, // Reflect the requesting origin, as defined by the browser
    credentials: true, // Enable browsers to include credentials in the request
  });
  await app.listen(3000);
}
bootstrap();

