import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // sqlite 설정
    TypeOrmModule.forRoot({
      // 데이터베이스 타입
      type: 'sqlite',
      //데이터베이스 파일명
      database: 'nestjs-auth-test.sqlite',
      // 엔티티 리스트
      entities: [User],
      // 데이터베이스에 스키마를 동기화
      synchronize: true,
      // SQL 실행 로그 확인
      logging: true,
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
