// 쉬운 계단 수

const N = Number(
  require('fs')
    .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
    .toString()
);

solve(N);

function solve(N) {
  // dp[i][j] => i 자릿수를 가진 숫자 중 j로 끝나는 계단 수 개수
  const dp = Array.from({ length: N + 1 }, () => Array(10).fill(0));
  // N이 1인 경우 0만 0이고 나머진 1
  for (let i = 1; i < 10; i++) {
    dp[1][i] = 1;
  }

  // dp[i][j] = dp[i-1][j-1](j > 0) + dp[i-1][j+1](j < 9)
  for (let i = 2; i <= N; i++) {
    for (let j = 0; j < 10; j++) {
      if (j > 0) dp[i][j] += dp[i - 1][j - 1];
      if (j < 9) dp[i][j] += dp[i - 1][j + 1];
      dp[i][j] %= 1000000000;
    }
  }

  let ans = dp[N].reduce((acc, cur) => acc + cur, 0);
  console.log(ans %= 1000000000);
}
