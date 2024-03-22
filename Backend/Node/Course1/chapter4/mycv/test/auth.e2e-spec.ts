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
      .post('/auth/signup') // POST 요청
      .send({ email, password: 'test' }) // POST 요청에 담을 데이터(Body)
      .expect(201) // 예상 응답 코드
      .then((res) => {
        const { id, email: resEmail } = res.body;
        expect(id).toBeDefined(); // id가 존재함을 확인
        expect(resEmail).toEqual(email); // 응답에서 보낸 이메일과 일치하는지 확인
      });
  });

  it('signup as a new user then get the currently logged in user', async () => {
    const email = 'test10@test.com';

    // 응답 저장
    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: 'test' })
      .expect(201);

    // 응답에서 쿠키 저장
    const cookie = res.get('Set-Cookie');

    // 쿠키를 담아서 GET 요청
    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200);

    // 응답의 body에 저장된 email과 입력한 email 비교
    expect(body.email).toEqual(email);
  });
});
