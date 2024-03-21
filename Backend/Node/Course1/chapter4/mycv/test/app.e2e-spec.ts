import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())   // http 서버에 요청 보내기
      .get('/')                           // 요청을 사용자가 지정하는 여러 메서드 호출과 연결
      .expect(200)                        // 반환되는 응답 예상
      .expect('Hello World!');
  });
});
