import { cookies } from 'next/headers';
import { Lucia } from 'lucia';
import { BetterSqlite3Adapter } from '@lucia-auth/adapter-sqlite';

import db from './db';

/* 
  adapter: 세션을 어디에, 어떻게 저장할지 선택

  BetterSqlite3Adapter: better-sqlite3 사용
    - 첫 번째 인수: 사용하는 데이터베이스 전달
    - 두 번째 인수: config 객체 전달
      - user: 사용자의 데이터베이스 테이블명 (사용자 정보가 저장된 곳)
      - session: 세션 정보가 저장될 또는 저장된 테이블명
*/
const adapter = new BetterSqlite3Adapter(db, {
  user: 'users',
  session: 'sessions',
});

/* 
  lucia: 타사 인증 패키지
    - 첫 번째 인자: 설정한 adapter 전달
    - 두 번째 인자: config 객체
      - sessionCookie: 세션 ID가 포함된 쿠키를 자동으로 생성함
*/
const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false, // NextJS에선 expires: false 설정(https://lucia-auth.com/getting-started/nextjs-app)
    attributes: {
      secure: process.env.NODE_ENV === 'production', // 배포용인 경우 https 사용
    },
  },
});

export async function createSession(userId) {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
}

export async function verifyAuth() {
  const sessionCookie = cookies().get(lucia.sessionCookieName);
  if (!sessionCookie) return { user: null, session: null };

  const sessionId = sessionCookie.value;
  if (!sessionId) return { user: null, session: null };

  const result = await lucia.validateSession(sessionId);

  // NextJS는 페이지 렌더링 시 쿠기를 설정하는 것을 좋아하지 않음 => 에러 무시를 위해 try/catch 사용
  try {
    // 유효한 세션을 가지고 있는 경우
    if (result.session && result.session.fresh) {
      // 기존 활성 세션을 위한 쿠기를 재생성해서 쿠키를 연장함
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }

    // 유효하지 않은 세션 쿠키를 가지고 있는 경우
    if (!result.session) {
      // 기존 쿠키 지우기
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch (error) {}

  return result;
}

export async function destroySession() {
  const { session } = await verifyAuth();
  if (!session) return { error: 'Unauthorized!' };

  // 세션 삭제
  await lucia.invalidateSession(session.id);
  // 쿠키 삭제
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
}
