require('dotenv').config(); // .env 사용
const MongoClient = require('mongodb').MongoClient;

const DB_ID = process.env.DB_ID;
const DB_PASSWORD = process.env.DB_PASSWORD;

const url = `mongodb+srv://${DB_ID}:${DB_PASSWORD}@node.5fusz1w.mongodb.net/test?retryWrites=true&w=majority`;

// 1. MongoClient 생성
const client = new MongoClient(url);

async function main() {
  try {
    // 2. 커넥션을 생성하고 연결 시도
    await client.connect();

    console.log('MongoDB 접속 성공');

    // 3. test 데이터베이스의 person 컬렉션 가져오기
    const collection = client.db('test').collection('person');

    // 4. 문서 하나 추가
    await collection.insertOne({ name: '김', age: 26 });
    console.log('문서 추가 완료');

    // 5. 문서 찾기
    const documents = await collection.find({ name: '김' }).toArray();
    console.log('찾은 문서: ', documents);

    // 6. 문서 업데이트
    await collection.updateOne({ name: '김' }, { $set: { age: 28 } });
    console.log('문서 업데이트');

    // 7. 업데이트된 문서 확인
    const updatedDocuments = await collection.find({ name: '김' }).toArray();
    console.log('업데이트된 문서: ', updatedDocuments);

    // 8. 문서 삭제
    await collection.deleteOne({ name: '김' });
    console.log('문서 삭제');

    // 연결 끊기
    await client.close();
  } catch (error) {
    console.error(error);
  }
}

main();
