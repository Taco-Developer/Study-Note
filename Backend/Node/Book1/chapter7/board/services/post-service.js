const { ObjectId } = require('mongodb');
const paginator = require('../utils/paginator');

// 글쓰기 함수
async function writePost(collection, post) {
  // 조회수
  post.hits = 0;
  // 생성 일시
  post.createdAt = new Date().toISOString();
  // 몽고이비에 post 저장 후 결과 반환
  return await collection.insertOne(post);
}

// 글 목록
async function list(collection, page, search) {
  // 한 페이지에 노출할 글 개수
  const perPage = 10;

  // title이 search와 부분일치하는지 확인
  const query = { title: new RegExp(search, 'i') };
  // 생성일 역순으로 정렬
  const cursor = collection
    .find(query, {
      limit: perPage,
      skip: (page - 1) * perPage,
    })
    .sort({ createdAt: -1 });

  // 검색어에 걸리는 게시물의 총합
  const totalCount = await collection.count(query);
  // 커서로 받아온 데이터를 리스트로 변경
  const posts = await cursor.toArray();
  // 페이지네이터 생성
  const paginatorObj = paginator({ totalCount, page, perPage });
  return [posts, paginatorObj];
}

// 패스워드는 노출할 필요가 없으므로 결과값에서 제외
const projectionOption = {
  // 프로젝션(투영) 결과값에서 일부만 가져올 때 사용
  projection: {
    password: 0,
    'comments.password': 0,
  },
};

// post 상세 조회
async function getDetailPost(collection, id) {
  // 몽고디비 Collection의 findOneAndUpdate() 함수를 사용
  // 게시글을 읽을 때마다 hits를 1 증가
  return await collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $inc: { hits: 1 } },
    { ...projectionOption, returnDocument: 'after' }
  );
}

// id와 password로 post 조회
async function getPostByIdAndPassword(collection, { id, password }) {
  return await collection.findOne(
    { _id: new ObjectId(id), password },
    projectionOption
  );
}

// id로 post 조회
async function getPostById(collection, id) {
  return await collection.findOne({ _id: new ObjectId(id) }, projectionOption);
}

// 게시글 수정
async function updatePost(collection, id, post) {
  const toUpdatePost = {
    $set: {
      ...post,
    },
  };
  return await collection.updateOne({ _id: new ObjectId(id) }, toUpdatePost);
}

module.exports = {
  writePost,
  list,
  getDetailPost,
  getPostByIdAndPassword,
  getPostById,
  updatePost,
  projectionOption,
};
