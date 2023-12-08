const http = require('http');
const url = require('url'); // 1. url 모듈

const server = http.createServer((req, res) => {
  const path = url.parse(req.url, true).pathname; // 2. pathname
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  // 리팩터링 이전
  // if (path === '/user') {                             // 3. /user 응답값 설정
  //   res.end('[user] name : 김, age: 26');
  // } else if (path === '/feed') {                      // 4. /feed 응답값 설정
  //   res.end(`
  //   <ul>
  //     <li>picture1</li>
  //     <li>picture2</li>
  //     <li>picture3</li>
  //   </ul>
  //   `)
  // } else {
  //   res.statusCode = 404;
  //   res.end("404 Page Not Found");                    // 5. 에러 메시지 설정
  // }

  // 첫 번째 리팩터링
  // if (path === '/user') {
  //   user(req, res);
  // } else if (path === '/feed') {
  //   feed(req, res);
  // } else {
  //   notFound(req, res);
  // }

  // 두 번째 리팩터링
  if (path in urlMap) {           // urlMap에 path가 있는지 확인
    urlMap[path](req, res);       // 매핑된 함수 실행
  } else {
    notFound(req, res);
  }
});

const user = (req, res) => {
  // 쿼리스트링 데이터 userInfo에 할당
  const userInfo = url.parse(req.url, true).query;
  // 응답값으로 name과 age 설정
  res.end(`[user] name : ${userInfo.name}, age: ${userInfo.age}`);
};

const feed = (req, res) => {
  res.end(`
    <ul>
      <li>picture1</li>
      <li>picture2</li>
      <li>picture3</li>
    </ul>
    `);
};

const notFound = (req, res) => {
  res.statusCode = 404;
  res.end('404 Page Not Found');
};

const urlMap = {            // path에 따라 실행될 함수를 값에 할당
  '/': (req, res) => {
    res.end('HOME');
  },
  '/user': user,
  '/feed': feed,
};

server.listen(8000, () => {
  console.log('Server 실행!');
});
