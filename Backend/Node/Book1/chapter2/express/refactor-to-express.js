const url = require('url');
const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log('Express로 라우터 리팩토링');
});

// GET 메서드 라우팅
app.get('/', (_, res) => {
  res.end('HOME');
});
app.get('/user', user);
app.get('/feed', feed);

// /user 실행 함수
function user(req, res) {
  const userInfo = url.parse(req.url, true).query;
  res.json(`[user] name: ${userInfo.name}, age: ${userInfo.age}`);
}

// /feed 실행 함수
function feed(_, res) {
  res.json(`<ul>
      <li>picture1</li>
      <li>picture2</li>
      <li>picture3</li>
    </ul>`);
}
