const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

// 집 개수
const N = +input[0];

// 페인트 가격
const houseArr = [];
for (let i = 1; i <= N; i++) {
  houseArr.push(
    input[i]
      .trim()
      .split(' ')
      .map((num) => +num)
  );
}

for (let i = 1; i < N; i++) {
  // 빨간색을 칠하는 경우
  houseArr[i][0] +=
    houseArr[i - 1][1] < houseArr[i - 1][2]
      ? houseArr[i - 1][1]
      : houseArr[i - 1][2];

  // 파란색을 칠하는 경우
  houseArr[i][1] +=
    houseArr[i - 1][0] < houseArr[i - 1][2]
      ? houseArr[i - 1][0]
      : houseArr[i - 1][2];

  // 초록색을 칠하는 경우
  houseArr[i][2] +=
    houseArr[i - 1][0] < houseArr[i - 1][1]
      ? houseArr[i - 1][0]
      : houseArr[i - 1][1];
}

// 최솟값 출력
console.log(Math.min(...houseArr[N - 1]));
