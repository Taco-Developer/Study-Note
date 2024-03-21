import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
// import { setupApp } from './setup-app';
// const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 직접 설정
  // app.use(
  //   cookieSession({
  //     keys: ['secret'],
  //   }),
  // );
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //   }),
  // );

  // 헬퍼 함수 사용
  // setupApp(app);

  await app.listen(3000);
}
bootstrap();
