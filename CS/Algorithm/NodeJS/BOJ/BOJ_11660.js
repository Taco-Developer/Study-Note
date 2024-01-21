const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

// N: 표의 크기, M: 합을 구하는 횟수
const [N, M] = input[0]
  .trim()
  .split(' ')
  .map((num) => +num);

// 표
const arr = [];
// 인덱스 1부터 시작하기 위해 0으로 초기화된 N+1 길이 배열 추가
arr.push(Array(N + 1).fill(0));
// 표 데이터 삽입 (인덱스 1로 시작하기 위해 데이터 맨 앞에 0 추가)
for (let i = 1; i <= N; i++) {
  arr.push([
    0,
    ...input[i]
      .trim()
      .split(' ')
      .map((num) => +num),
  ]);
}

const ans = [];

function solve1() {
  // arr[x][y] 값은 (1, 1)부터 (x, y)까지 누적된 합
  for (let x = 1; x <= N; x++) {
    arr[x][0] += arr[x - 1][N];
    for (let y = 1; y <= N; y++) {
      arr[x][y] += arr[x][y - 1];
    }
  }

  for (let i = N + 1; i <= N + M; i++) {
    const [x1, y1, x2, y2] = input[i]
      .trim()
      .split(' ')
      .map((num) => +num);

    // (x1, y1)부터 (x2, y2)까지의 합
    let result = arr[x2][y2] - arr[x1][y1 - 1];
    // y1이 1이 아니면 포함되지 않는 부분(사각형의 앞)이 생기므로 포함되지 않는 부분 빼기
    if (y1 !== 1) {
      for (let x = x1 + 1; x <= x2; x++) {
        result -= arr[x][y1 - 1] - arr[x][0];
      }
    }

    // y2가 N보다 작다면 포함되지 않는 부분(사각형의 뒤)이 생기므로 포함되지 않는 부분 빼기
    if (y2 !== N) {
      for (let x = x1; x < x2; x++) {
        result -= arr[x][N] - arr[x][y2];
      }
    }

    ans.push(result);
  }

  console.log(ans.join('\n'));
}

function solve2() {
  // 누적합 저장
  const sumArr = Array.from({ length: N + 1 }, () => Array(N + 1).fill(0));
  // (1,1)부터 (x,y)까지 합을 저장 (직사각형 모양으로 y범위를 벗어나는 구역은 합하지 않음)
  for (let x = 1; x <= N; x++) {
    for (let y = 1; y <= N; y++) {
      sumArr[x][y] =
        sumArr[x][y - 1] + sumArr[x - 1][y] - sumArr[x - 1][y - 1] + arr[x][y];
    }
  }

  for (let i = N + 1; i <= N + M; i++) {
    const [x1, y1, x2, y2] = input[i]
      .trim()
      .split(' ')
      .map((num) => +num);

    // (1, 1)부터 (x2, y2)까지 합에서 (1,1)부터 (x1-1, y2)까지 합을 빼고 (1, 1)부터 (x2, y1-1)까지 합을 빼기
    // 마지막으로 중복으로 제거되어 두 번 빼기가 실행되었으므로 (1,1)부터 (x1-1, y1-1)까지의 합을 더함
    ans.push(
      sumArr[x2][y2] -
        sumArr[x1 - 1][y2] -
        sumArr[x2][y1 - 1] +
        sumArr[x1 - 1][y1 - 1]
    );
  }

  console.log(ans.join('\n'));
}
