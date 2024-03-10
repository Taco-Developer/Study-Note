const N = +require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString();

solve(N);

function solve(N) {
  const dp = Array(N + 1).fill(0);
  dp[1] = 1;
  dp[2] = 2;

  // 마지막에 크기가 1인 수열을 더하는 경우와 크기가 2인 수열을 더하는 경우로 구분
  // 2인 수열을 더하는 경우 마지막이 1로 끝나는 경우는 제외
  // dp[i] = dp[i-1] + dp[i - 2] * 2 - dp[i-2] = dp[i-1] + dp[i - 2];
  for (let i = 3; i <= N; i++) {
    dp[i] = (dp[i - 1] + dp[i - 2]) % 15746;
  }

  console.log(dp[N]);
}
