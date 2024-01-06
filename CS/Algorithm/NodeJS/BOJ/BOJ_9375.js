// 입력
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

// T: 테스트 케이스 개수
const T = +input[0];

// 현재 케이스 시작 인덱스
let now = 0;

// 정답
const ans = [];

for (let t = 0; t < T; t++) {
  now += 1;
  // 현재 옷의 개수
  const clothesNum = +input[now];
  // 옷의 종류별 개수를 저장한 dict
  const clothesDict = {};

  // 옷을 종류를 key로 개수를 value로 저장
  for (let i = 0; i < clothesNum; i++) {
    const [_, category] = input[now + i + 1].trim().split(' ');

    // 카테고리가 있다면 + 1
    if (clothesDict[category]) {
      clothesDict[category] += 1;
      continue;
    }

    // 카테고리가 없다면 1로 저장
    clothesDict[category] = 1;
  }

  // 카테고리 종류 모음
  const categories = Object.keys(clothesDict);

  let cnt = 1;
  for (const category of categories) {
    // 카테고리에서 선택하지 않는 경우 + 카테고리에서 아이템을 하나 선택하는 경우
    // 1 + 카테고리 아이템 개수
    // 모든 카테고리에서 선택하므로 곱하기
    cnt *= clothesDict[category] + 1;
  }
  // 알몸 제외
  cnt -= 1;

  ans.push(cnt);

  // 다음 케이스로 이동
  now += clothesNum;
}

// 출력
console.log(ans.join('\n'));
