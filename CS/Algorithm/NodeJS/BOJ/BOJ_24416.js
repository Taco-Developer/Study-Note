// 알고리즘 수업 - 피보나치 수 1

const n = +require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString();

solve(n);

function solve(n) {
  const dp = Array(n + 1).fill(0);
  dp[1] = 1;
  dp[2] = 1;
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  console.log(dp[n], n - 2);
}
