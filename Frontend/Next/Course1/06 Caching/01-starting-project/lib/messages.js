import { cache } from 'react';
import { unstable_cache as nextCache } from 'next/cache';
import sql from 'better-sqlite3';

const db = new sql('messages.db');

function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY, 
      text TEXT
    )`);
}

initDb();

export function addMessage(message) {
  db.prepare('INSERT INTO messages (text) VALUES (?)').run(message);
}

/*
  cache (React) - Request Memoization

  중복 요청 제거가 발생해야 하는 함수를 감싸는 데 사용
    - 함수가 처음 호출될 때 반환한 데이터를 React가 캐싱
    - 단일 요청 주기 내에 있다면 캐싱

  unstable_cache (next/cache) - Data Cache

  프로미스 반환
    - 사용하는 곳에서 async, await 사용

  두 번째 인수로 캐시 키의 배열 지정
    - 내부적으로 캐시된 데이터를 식별하는 데 사용 (우리가 할당할 수 있는 태그와 다름)

  세 번째 인수로 config 객체 전달
    - revalidate와 tags 지정 가능
*/
export const getMessages = nextCache(
  cache(function getMessages() {
    console.log('Fetching messages from db');
    return db.prepare('SELECT * FROM messages').all();
  }),
  ['messages'],
  {
    tags: ['msg'],
  }
);
