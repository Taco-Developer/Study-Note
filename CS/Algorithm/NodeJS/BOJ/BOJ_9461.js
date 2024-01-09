const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

// 테스트 케이스
const T = +input[0];

// 삼각형 변의 길이가 저장됨
const dp = Array(101).fill(0);
dp[1] = 1;
dp[2] = 1;
dp[3] = 1;
dp[4] = 2;
dp[5] = 2;

// 삼각형 변의 길이를 구하는 함수
function findSideLength(n, dp) {
  // 이미 저장되어 있다면 반환
  if (dp[n]) return dp[n];

  // 저장되어 있지 않다면 직전 삼각형 변의 길이 + 5번째 전 삼각형 변의 길이 저장 후 반환
  dp[n] = findSideLength(n - 1, dp) + findSideLength(n - 5, dp);
  return dp[n];
}

// 정답
const ans = [];

for (let i = 1; i < T + 1; i++) {
  // 삼각형 순서
  const n = +input[i];
  // n번째 삼각형 변의 길이를 ans 저장
  ans.push(findSideLength(n, dp));
}

// 출력
console.log(ans.join('\n'));
