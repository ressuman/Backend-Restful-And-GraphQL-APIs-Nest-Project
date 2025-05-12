import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { EntityNotFoundFilter } from './entity-not-found/entity-not-found.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable API versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Set global prefix
  app.setGlobalPrefix('api');

  app.useGlobalFilters(new EntityNotFoundFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(
    `Application is running on: http://localhost:${port}/api/v1/graphql`,
  );
}
bootstrap();
