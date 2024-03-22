import { rm } from 'fs/promises';
import { join } from 'path';

// 모든 e2e 테스트 전에 데이터베이스 파일 삭제를 위해 전역 beforeEach 설정
global.beforeEach(async () => {
  // 데이터베이스 파일이 없는 경우 에러 처리
  try {
    await rm(join(__dirname, '..', 'test.sqlite'));
  } catch (error) {}
});
