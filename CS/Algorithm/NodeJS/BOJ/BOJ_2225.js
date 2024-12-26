function solution(input) {
  const [N, K] = input.split(' ').map(Number);

  // dp[n][k] = n을 k개로 만들 수 있는 경우의 수
  const dp = Array.from({ length: N + 1 }, () => Array(K + 1).fill(0));

  // n === 0인 경우는 모두 1개 (0을 만드는 경우는 0을 더하는 경우만 있음)
  for (let k = 1; k <= K; k++) dp[0][k] = 1;

  // k === 1인 경우는 모두 1개 (1개를 써서 n을 만드는 방법은 n 1개를 사용하는 경우만 있음)
  for (let n = 1; n <= N; n++) dp[n][1] = 1;

  // dp[n][k] = dp[n][k-1] + dp[n-1][k] => 0 ~ n을 k-1개로 만든 경우
  // dp[n][k-1] => n을 k-1개로 만든 경우
  // dp[n-1][k] => n-1을 k-1개로 만든 경우 + n-2를 k-1개로 만든 경우 + ... + 0을 k-1개로 만든 경우
  //   === 0 ~ n-1을 k-1개로 만든 경우
  for (let n = 1; n <= N; n++) {
    for (let k = 1; k <= K; k++) {
      dp[n][k] = (dp[n][k - 1] + dp[n - 1][k]) % 1000000000;
    }
  }

  console.log(dp[N][K]);
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath, 'utf-8').toString().trim();

solution(input);
