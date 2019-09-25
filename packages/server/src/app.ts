import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from './config/config.service';

export async function bootstrap(port?: number | string) {
  const app = await NestFactory.create(AppModule, { cors: true });  // TODO: switch to dynamic modules and pass config service there
  const config = new ConfigService();

  const options = new DocumentBuilder()
    .setTitle('Zorko REST API')
    .setDescription('The zorko REST API description')
    .setVersion('1.0')
    .addTag('users')
    .addTag('user-profiles')
    .addBearerAuth()
    .build();

  // @ts-ignore
  const document = SwaggerModule.createDocument(app, options);
  // @ts-ignore
  SwaggerModule.setup('swagger', app, document);

  app.useGlobalPipes(new ValidationPipe());
  debugger;
  await app.listen(config.get('PORT') ||  3000);
  return {
    async close() {
      return  await app.close();
    }
  }
}
