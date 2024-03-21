import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
// import { setupApp } from '../src/setup-app';

describe('Authentication System', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // 헬퍼 함수 실행
    // setupApp(app);
    await app.init();
  });

  it('handles a signup request', () => {
    const email = 'test104@test.com';

    return request(app.getHttpServer())
      .post('/auth/signup')                 // POST 요청
      .send({ email, password: 'test' })    // POST 요청에 담을 데이터(Body)
      .expect(201)                          // 예상 응답 코드
      .then((res) => {
        const { id, email: resEmail } = res.body;
        expect(id).toBeDefined();           // id가 존재함을 확인
        expect(resEmail).toEqual(email);    // 응답에서 보낸 이메일과 일치하는지 확인
      });
  });
});
