import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:4200',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Lingua API')
    .setDescription('Learn Italian & Spanish')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.APP_PORT || 3000;
  await app.listen(port);

  console.log(`✅ Servidor corriendo en http://localhost:${port}`);
  console.log(`📚 Swagger en http://localhost:${port}/api`);
}

bootstrap();