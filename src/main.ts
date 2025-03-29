import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CanContextService } from './common/context';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  app.setGlobalPrefix('v1');

  CanContextService.init(app);

  // Swagger Configuration
  const options = new DocumentBuilder()
    .setTitle('Wendor Commerce API')
    .setDescription('Wendor API Description ')
    .setVersion('1.0')
    .addTag('wendor')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
