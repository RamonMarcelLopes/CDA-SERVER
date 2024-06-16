import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('CDA-SERVER')
    .setDescription('CDA-Redeem emblems')
    .setVersion('1.0.0')
    .addTag('Login')
    .addTag('User')
    .addTag('Emblema')
    .addTag('Server')
    .addBasicAuth(
      {
        type: 'http',
        scheme: 'basic',
      },
      'Login',
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'JWT',
    )

    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3333);
  console.log('🚀 server runing on port http://localhost:3333/');
}
bootstrap();
