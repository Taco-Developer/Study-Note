const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const T = +input[0];
const ans = [];

for (let t = 0; t < T; t++) {
  // 열 개수
  const n = +input[3 * t + 1];
  // 스티커 정보
  const row1 = input[3 * t + 2]
    .trim()
    .split(' ')
    .map((num) => +num);
  const row2 = input[3 * t + 3]
    .trim()
    .split(' ')
    .map((num) => +num);

  // 인덱스 위치까지 스티커 최댓값 저장 (0: 위쪽 스티커 선택, 1: 아래쪽 스티커 선택, 2: 스티커 선택X)
  const dp = Array.from({ length: 3 }, () => Array(n).fill(0));
  dp[0][0] = row1[0];
  dp[1][0] = row2[0];

  for (let x = 1; x < n; x++) {
    // 위쪽 선택
    dp[0][x] = row1[x] + Math.max(dp[1][x - 1], dp[2][x - 1]);
    // 아래쪽 선택
    dp[1][x] = row2[x] + Math.max(dp[0][x - 1], dp[2][x - 1]);
    // 이전에 저장된 값에서 최댓값을 저장
    dp[2][x] = Math.max(dp[0][x - 1], dp[1][x - 1]);
  }

  ans.push(Math.max(dp[0][n - 1], dp[1][n - 1], dp[2][n - 1]));
}

console.log(ans.join('\n'));
