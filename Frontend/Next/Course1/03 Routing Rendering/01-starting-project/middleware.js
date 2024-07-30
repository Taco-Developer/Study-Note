/* 
  root 프로젝트 폴더에 middleware.js 파일 생성
    - middleware 함수 반환 (이름 중요!)

  middleware 함수
    - 자동으로 Request 객체를 받음
    - NextResponse 반환

  수신하는 요청 확인
    - 변경하거나 차단해서 인증 구현
    - 다른 페이지로 리다이렉션
    - ...


*/

import { NextResponse } from 'next/server';

export function middleware(request) {
  console.log(request);
  return NextResponse.next();
}

/* 
  config 객체
  
  matcher
    - 미들웨어를 트리거하는 요청을 필터링
*/
export const config = {
  matcher: '/news',
};
