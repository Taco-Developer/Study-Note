const http = require('http');                       // 1. http 객체 생성

let count = 0;

const server = http.createServer((req, res) => {    // 2. 서버 객체 생성
  log(count);                                       // 카운트 1 증가
  res.statusCode = 200;                             // 3. 응답코드 200
  res.setHeader('Content-Type', 'text/plain');      // 4. 헤더 설정
  res.write('hello\n');                             // 5. 응답값 설정

  setTimeout(() => {                                // 6. 2초 후 Node.js 출력
    res.end('Node.js');
  }, 2000);
});

function log(count) {
  console.log((count += 1));
}

server.listen(8000, () => {
  console.log("Hello Node.js");                     // 7. 8000번 포트로 서버 실행
})

