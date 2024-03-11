// 포도주 시식

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

solve(input);

function solve(input) {
  const n = +input[0];
  // 포도주 정보
  const wines = input.slice(1, n + 1).map(Number);

  // // [0] => 현재 위치의 포도주를 안 먹는 경우 최댓값
  // // [1] => 현재 위치 포도주를 첫 번째 순서로 먹는 경우 최댓값
  // // [2] => 현재 위치 포도주를 두 번째 순서로 먹는 경우 최댓값
  // const dp = Array.from({ length: n }, () => [0, 0, 0]);
  // dp[0][1] = wines[0];

  // for (let i = 1; i < n; i++) {
  //   // 현재 와인을 안 마실 것이므로 이전의 최댓값을 저장
  //   dp[i][0] = Math.max(...dp[i - 1]);
  //   // 첫 번째 순서로 마시므로 이전 와인을 안 마신 경우에 현재 와인 더하기
  //   dp[i][1] = dp[i - 1][0] + wines[i];
  //   // 두 번째 순서로 마시므로 이전 와인을 첫 번째 순서로 마신 경우에 현재 와인 더하기
  //   dp[i][2] = dp[i - 1][1] + wines[i];
  // }

  // dp[i] => 와인이 i + 1개 있을 때 최댓값
  const dp = Array(n).fill(0);
  dp[0] = wines[0];
  dp[1] = wines[0] + wines[1];
  dp[2] = Math.max(dp[1], wines[2] + dp[0], wines[2] + wines[1]);

  // 점화식
  // dp[i -1] => 현재 와인을 안 마시는 경우
  // wines[i] + dp[i - 2] => 현재 와인을 마시지만 첫 번째 순서로 마시는 경우
  // wines[i] + wines[i - 1] + dp[i - 3] => 현재 와인을 두 번째 순서로 마시는 경우
  for (let i = 3; i < n; i++) {
    dp[i] = Math.max(
      dp[i - 1],
      wines[i] + dp[i - 2],
      wines[i] + wines[i - 1] + dp[i - 3]
    );
  }

  console.log(dp[n - 1]);
}
