import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
const cookieSession = require('cookie-session');

@Module({
  imports: [
    // 어떤 환경 변수 파일을 읽을 것인지 지정
    ConfigModule.forRoot({
      // 나머지 애플리케이션 영역 전체에서 환경 변수 사용할 수 있도록 설정
      isGlobal: true,
      // 읽을 환경 변수 파일 경로
      // NODE_ENV는 package.json의 script로 설정
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: 'db.sqlite',
    //   entities: [User, Report],
    //   synchronize: true,
    // }),
    TypeOrmModule.forRootAsync({
      // 의존성 주입 시스템에 지시 
      // => TypeOrmModule을 설정하는 동안 ConfigService 인스턴스에 접근
      inject: [ConfigService],
      // ConfigService에서 환경 변수를 읽고 사용할 데이터베이스 옵션 반환
      useFactory: (config: ConfigService) => ({
        type: 'sqlite',
        database: config.get<string>('DB_NAME'),
        entities: [User, Report],
        synchronize: true,
      }),
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // 전역 범위로 유효성 검사 파이프 설정
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  // configure 함수는 애플리케이션이 들어오는 트래픽을 수신할 때 자동으로 호출됨
  // => 요청이 들어올 때마다 실행될 미들웨어 설정 가능
  configure(consumer: MiddlewareConsumer) {
    // 미들웨어 설정
    consumer
      .apply(
        cookieSession({
          keys: ['secret'],
        }),
      )
      .forRoutes('*'); // 모든 요청에서 미들웨어 사용 => 전역 미들웨어;
  }
}
