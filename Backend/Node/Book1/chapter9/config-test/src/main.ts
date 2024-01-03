import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ConfigService를 app.get()에 추가
  const configService = app.get(ConfigService);
  // configService 사용
  await app.listen(configService.get('SERVER_PORT'));
}

bootstrap();
