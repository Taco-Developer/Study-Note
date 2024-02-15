import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// 애플리케이션이 시작되면 실행될 함수
// 함수명 bootstrap은 흔히 사용되는 규약
async function bootstrap() {
  // AppModule로부터 NestJS 애플리케이션 인스턴스 생성
  const app = await NestFactory.create(AppModule);

  // 특정 포트로 유입되는 트래픽 리스닝
  await app.listen(3000);
}

// bootstrap 실행
bootstrap();
