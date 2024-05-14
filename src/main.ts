import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import "dotenv/config"
import { ValidationPipe } from '@nestjs/common';
import { PreloadService } from './preload.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerConfig= new DocumentBuilder()
    .setTitle('API - Ecommerce FT48')
    .setDescription('Proyecto Integrador de la especialidad Backend - M4')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  
  const document = SwaggerModule.createDocument(app,swaggerConfig);
  SwaggerModule.setup('api',app,document)


  app.use(LoggerMiddleware)
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT);

}
bootstrap();
