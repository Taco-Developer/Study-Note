/*
  라우트 핸들러
    - 다양한 함수를 내보내는 파일(GET, POST, PATCH, PUT, DELETE 등)
    - HTTP 메서드 이름이 있어야 함
  
  화면에 렌더링되는 페이지를 반환하지 않는 라우트를 설정
    - JSON 데이터를 반환하거나 수신되는 JSON 데이터를 수락하고 JSON 응답을 반환

  API 같은 라우트를 설정해 데이터를 생성, 저장하는 등 필요한 작업을 수행하되 클라이언트에서 내부적으로 호출함

  동일한 파일에 라우트 핸들러를 여러 개 설정해 같은 경로 내 다양한 요청을 처리할 수 있음
    - 라우트 핸들러는 자동으로 Request 객체를 받음
*/

export function GET(request) {
  console.log(request);

  return new Response('Hello');
}

export function POST(request) {
  console.log(request);

  return new Response('Hello');
}
