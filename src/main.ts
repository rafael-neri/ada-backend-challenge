import 'reflect-metadata';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { winstonLogger } from './common/config/logger';
import { addSwagger } from './common/config/swagger';

async function bootstrap() {
  const HOST = '0.0.0.0';
  const PORT = 3000;

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { logger: winstonLogger },
  );

  app.useGlobalPipes(new ValidationPipe());
  addSwagger(app);

  await app.listen(PORT, HOST, () => { Logger.log(`Listening on port ${PORT}`, 'NestApplication'); });
}

bootstrap().catch((err) => {
  Logger.error('Error on starting server.', 'NestApplication');
  throw err;
});
