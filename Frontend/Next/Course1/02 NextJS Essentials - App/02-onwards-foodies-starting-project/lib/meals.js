import fs from 'node:fs';
import sql from 'better-sqlite3'; // sqlite 사용
import slugify from 'slugify'; // slug 생성을 위해 사용
import xss from 'xss'; // 크로스 사이트 스크립팅(XSS) 방어에 도움을 줌

const db = sql('meals.db');

// async 컴포넌트 함수 예시를 위해 async로 생성
export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // 에러 발생
  // throw new Error();

  return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
  // 입력받은 값을 그대로 SQL문에 넣으면 SQL 인젝션에 노출될 수 있음
  // return db.prepare('SELECT * FROM meals WHERE slug = ' + slug)

  // ?를 플레이스홀더로 사용하고 하나만 원하기 때문에 get 메소드를 사용해 플레이스홀더에 들어갈 값을 전달함
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  // instructions 검열
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split('.').pop(); // 확장자명
  const fileName = `${meal.slug}.${extension}`; // 파일명

  // fs.createWriteStream: 어떤 파일에 데이터를 쓸 수 있도록 해주는 stream 생성
  const stream = fs.createWriteStream(`public/images/${fileName}`); // 파일 경로 전달(public 폴더에 저장)

  /* 
    이미지를 public 폴더에 저장하면 build 후 새로 입력한 이미지를 불러올 수 없음
      - build 이후엔 .next 안에 있는 데이터를 사용하기 때문
      - 로컬이 아닌 AWS S3와 같은 파일 저장 서비스를 이용해서 저장
  */

  const bufferedImage = await meal.image.arrayBuffer(); // Array Buffer로 변환

  /* 
    stream.wite(chunk, callback)

    chunk: 저장할 파일(Buffer)
      - bufferedImage는 Array Buffer이므로 일반 Buffer로 변환
    
    callback: 쓰기를 마치면 실행될 함수
      - error를 받음
  */
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) throw new Error('Saving image failed!');
  });

  // 저장한 이미지 경로로 덮어쓰기 - 모든 이미지 요청은 public 폴더로 보내기 때문에 public은 제거
  meal.image = `/images/${fileName}`;

  // 직접 값을 넣는 것은 SQL Injection 공격에 취약하므로 run 메서드로 객체를 전달하고 필드 이름을 통해 연결
  db.prepare(
    `
      INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug)
      VALUES (
        @title,
        @summary,
        @instructions,
        @creator,
        @creator_email,
        @image,
        @slug
      )  
    `
  ).run(meal);
}
