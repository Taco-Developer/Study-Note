import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { WeatherModule } from './weather/weather.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import config from './configs/config';

// 서버 기동 시 환경 변수 출력
console.log('env : ' + process.env.NODE_ENV);

@Module({
  // ConfigModule 설정
  imports: [
    ConfigModule.forRoot({
      // 전역 모듈 설정 추가
      isGlobal: true,
      // 환경 변수 파일 경로 지정
      envFilePath: `${process.cwd()}/envs/${process.env.NODE_ENV}.env`,
      // 커스텀 설정 파일 설정
      load: [config],
      // 캐시 사용
      cache: true,
      // 확장 변수 옵션 추가
      expandVariables: true,
    }),
    WeatherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
