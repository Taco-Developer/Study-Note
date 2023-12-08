const express = require('express');
const port = 3000;
const app = express();
// 게시글 리스트
let posts = [];

// req.body를 사용하기 위해 JSON 미들웨어 사용
app.use(express.json());
// POST 요청 시 Content-Type이 application/x-www-form-urlencoded인 경우 파싱
app.use(express.urlencoded({ extended: true }));

// /로 요청오면 실행
app.get('/', (req, res) => {
  res.json(posts);
});

// /posts로 요청오면 실행
app.post('/posts', (req, res) => {
  // HTTP body 데이터 변수에 할당
  const { title, name, text } = req.body;

  // 게시글 생성
  posts.push({
    id: posts.length + 1,
    title,
    name,
    text,
    createdAt: Date(),
  });

  res.json({ title, name, text });
});

app.delete('/posts/:id', (req, res) => {
  // path 정보에서 id값 가져오기
  const id = req.params.id;

  // 글 삭제 로직
  const filteredPosts = posts.filter((post) => post.id !== +id);
  const isLengthChanged = posts.length !== filteredPosts.length;
  posts = filteredPosts;

  // 데이터 개수가 변경되었다면 글 삭제 성공
  if (isLengthChanged) {
    res.json('OK');
    return;
  }

  // 글 삭제 실패
  res.json('NOT CHANGED');
});

app.listen(port, () => {
  console.log('Welcome Posts Start');
});
