const express = require('express');

// html engine
const handlebars = require('express-handlebars');

// mongodb
const { ObjectId } = require('mongodb');
const mongodbConnection = require('./configs/mongodb-connection');

// 서비스 파일 로딩
const postService = require('./services/post-service');

// ------------------------------------ //

const app = express();
let collection;

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. 템플릿 엔진으로 핸들바 등록
app.engine(
  'handlebars',
  handlebars.create({
    helpers: require('./configs/handlebars-helpers'),
  }).engine
);
// 2. 웹페이지 로드 시 사용할 템플릿 엔진 설정
app.set('view engine', 'handlebars');
// 3. 뷰 디렉터리를 view로 설정
app.set('views', __dirname + '/views');

// 4. 라우터 설정
// 홈 페이지
app.get('/', async (req, res) => {
  //  현재 페이지 데이터
  const page = parseInt(req.query.page) || 1;
  // 검색어 데이터
  const search = req.query.search || '';

  try {
    // 글 목록과 페이지네이터 가져옴
    const [posts, paginator] = await postService.list(collection, page, search);

    // 리스트 페이지 렌더링
    res.render('home', { title: '테스트 게시판', search, paginator, posts });
  } catch (error) {
    console.error(error);
    // 에러가 발생하는 경우 빈 값으로 렌더링
    res.render('home', { title: '테스트 게시판' });
  }
});

// 쓰기 페이지
app.get('/write', (req, res) => {
  res.render('write', { title: '테스트 게시판', mode: 'create' });
});

// 글쓰기
app.post('/write', async (req, res) => {
  const post = req.body;
  const result = await postService.writePost(collection, post);
  res.redirect(`/detail/${result.insertedId}`);
});

// 상세 페이지
app.get('/detail/:id', async (req, res) => {
  const id = req.params.id;
  // 게시글 정보 가져오기
  const result = await postService.getDetailPost(collection, id);
  res.render('detail', { title: '테스트 게시판', post: result });
});

// 패스워드 체크
app.post('/check-password', async (req, res) => {
  const { id, password } = req.body;

  // 게시글 데이터 확인
  const post = await postService.getPostByIdAndPassword(collection, {
    id,
    password,
  });

  // 데이터가 있으면 isExist true, 없으면 false
  if (!post) {
    return res.status(404).json({ isExist: false });
  } else {
    return res.json({ isExist: true });
  }
});

// 수정 페이지
app.get('/modify/:id', async (req, res) => {
  const id = req.params.id;
  const post = await postService.getPostById(collection, id);
  console.log(post);
  res.render('write', { title: '테스트 게시판', mode: 'modify', post });
});

// 게시글 수정
app.post('/modify', async (req, res) => {
  const { id, title, writer, password, content } = req.body;

  const post = {
    title,
    writer,
    password,
    content,
    createdAt: new Date().toISOString(),
  };

  // 업데이트 결과
  const result = await postService.updatePost(collection, id, post);
  res.redirect(`/detail/${id}`);
});

// 게시글 삭제
app.delete('/delete', async (req, res) => {
  const { id, password } = req.body;
  try {
    // deleteOne으로 게시글 하나 삭제
    const result = await collection.deleteOne({
      _id: new ObjectId(id),
      password,
    });

    // 삭제 결과가 잘못된 경우
    if (result.deletedCount !== 1) {
      console.log('삭제 실패');
      return res.json({ isSuccess: false });
    }

    return res.json({ isSuccess: true });
  } catch (error) {
    // 에러 처리
    console.error(error);
    return res.json({ isSuccess: false });
  }
});

// 댓글 추가
app.post('/write-comment', async (req, res) => {
  const { id, name, password, comment } = req.body;
  // id로 게시글 정보 가져오기
  const post = await postService.getPostById(collection, id);

  const commentData = {
    name,
    password,
    comment,
    createdAt: new Date().toISOString(),
  };

  // 댓글 리스트가 있다면 댓글 정보 추가
  if (post.comments) {
    post.comments.push({
      idx: post.comments.length + 1,
      ...commentData,
    });
  } else {
    // 댓글 리스트가 없다면 리스트 생성 후 댓글 정보 추가
    post.comments = [{ idx: 1, ...commentData }];
  }

  // 업데이트하고 상세 페이지로 리다이렉트
  await postService.updatePost(collection, id, post);

  return res.redirect(`/detail/${id}`);
});

// 댓글 삭제
app.delete('/delete-comment', async (req, res) => {
  const { id, idx, password } = req.body;

  // 게시글의 comments 안에 있는 특정 댓글 데이터 찾기
  const post = await collection.findOne(
    {
      _id: new ObjectId(id),
      comments: { $elemMatch: { idx: parseInt(idx), password } },
    },
    postService.projectionOption
  );

  // 데이터가 없으면 isSuccess: false 반환 후 종료
  if (!post) {
    return res.json({ isSuccess: false });
  }

  // 댓글 번호가 idx 이외인 것만 comments에 다시 할당 후 저장
  post.comments = post.comments.filter((comment) => comment.idx != idx);
  await postService.updatePost(collection, id, post);
  return res.json({ isSuccess: true });
});

app.listen(3000, async () => {
  console.log('Server started');
  // mongodbConnection() => mongoClient
  const mongoClient = await mongodbConnection();
  // mongoClient.db()로 디비 선택, collection()으로 컬렉션 선택 후 collection에 할당
  collection = mongoClient.db().collection('post');
  console.log('MongoDB connected');
});
