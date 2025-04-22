import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import * as compression from 'compression';

function setupSwagger(nestApp: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('EXE201 - Sợi nhớ API Documentation')
    .setDescription('')
    .setVersion('1.0')
    .addBearerAuth();

  const document = SwaggerModule.createDocument(nestApp, options.build());
  SwaggerModule.setup('docs', nestApp, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      displayOperationId: true,
      displayRequestDuration: true,
      filter: true,
    },
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.use(compression());
  app.use(bodyParser.json({ limit: '5mb' })); // For JSON payloads
  app.enableShutdownHooks();

  setupSwagger(app);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
