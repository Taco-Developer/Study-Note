// 입력
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

// n: 계단 개수
const n = +input[0];

// 점수를 누적해서 저장
// 1: 처음 계단을 밟는 경우, 2: 연속으로 계단을 밟는 경우
const ans = Array.from({ length: n + 1 }, () => ({ 1: 0, 2: 0 }));
// 첫 계단은 처음만 밟을 수 있음
ans[1][1] = +input[1];

// 계단을 하나씩 올라가면 처음 밟는 경우와 연속으로 밟는 경우 점수를 합해서 저장
for (let i = 2; i < n + 1; i++) {
  // 현재 계단 점수
  const score = +input[i];
  // 계단을 처음 밟는 경우
  ans[i][1] +=
    // 계단의 점수 + 두 계단 전에 쌓인 점수에서 최댓값
    score + (ans[i - 2][1] >= ans[i - 2][2] ? ans[i - 2][1] : ans[i - 2][2]);

  // 계단을 연속으로 밟는 경우
  // 계단의 점수 + 직전 계단에서 처음 밟은 경우 쌓인 점수
  ans[i][2] += score + ans[i - 1][1];
}

// 목표 계단까지 쌓인 점수 중 최댓값 출력
console.log(ans[n][1] >= ans[n][2] ? ans[n][1] : ans[n][2]);
