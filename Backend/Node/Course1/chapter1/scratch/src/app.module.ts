import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

/**
 * 컨트롤러 생성과 마찬가지로 데코레이터 사용
 * Module 데코레이터를 사용할 땐 항상 옵션 객체를 넣어야 함
 * controllers 속성은 애플리케이션에서 사용하는 컨트롤러를 나열
 * 애플리케이션이 시작될 때마다 NestJS는 AppModule을 확인하고 나열된 모든 컨트롤러를 검색
 * 모든 컨트롤러 클래스의 인스턴스를 자동으로 생성
 * 이후 데코레이터를 살펴보고 사용한 데코레이터에 대해 라우트 핸들러를 설정
 */
@Module({
  controllers: [AppController],
})
export class AppModule {}
