import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

  /*
   * `whitelist` strips properties with no DTO decorator and `forbidNonWhitelisted`
   * rejects them outright, so a caller cannot smuggle `views: 9999` or
   * `status: "published"` into a create request by appending it to the body.
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: false },
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  const origins = (process.env.CORS_ORIGINS ?? 'http://localhost:3000')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.enableCors({
    origin: origins,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: false,
  });

  const port = Number(process.env.PORT ?? 4000);
  await app.listen(port);

  new Logger('Bootstrap').log(`TechCADD blog API listening on http://localhost:${port}/api`);
}

void bootstrap();
