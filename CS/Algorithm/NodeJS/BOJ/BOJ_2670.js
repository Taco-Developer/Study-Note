const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

solve(input);

function solve(input) {
  const N = +input[0];
  const floats = input.slice(1, N + 1).map(Number);
  
  // dp[i] = floats[i]를 선택하는 경우 최댓값
  // 이전 연속 곱셈 결과값에 floats[i]를 곱하는 경우와 
  // floats[i]로 곱을 시작하는 경우 중 최댓값 저장
  const dp = Array(N).fill(0);
  dp[0] = floats[0];
  for (let i = 1; i < N; i++) {
    dp[i] = Math.max(dp[i - 1] * floats[i], floats[i]);
  }

  console.log(Math.max(...dp).toFixed(3));
}
