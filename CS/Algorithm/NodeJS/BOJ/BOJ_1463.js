// 1로 만들기
const n = Number(
  require('fs')
    .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
    .toString()
);

solve(n);

function solve(n) {
  // dp[i]는 i까지 도달하기 위해 필요한 연산 개수 중 최솟값
  const dp = Array(n + 1).fill(0);

  for (let i = 2; i <= n; i++) {
    // 1을 뺀 경우, 2로 나눈 경우, 3으로 나눈 경우 중 최솟값에 + 1 저장

    // 1을 뺀 경우
    dp[i] = dp[i - 1];
    // 2로 나눈 경우
    if (i % 2 === 0) {
      dp[i] = Math.min(dp[i], dp[i / 2]);
    }
    // 3으로 나눈 경우
    if (i % 3 === 0) {
      dp[i] = Math.min(dp[i], dp[i / 3]);
    }

    // 연산을 1번 실행하므로 + 1
    dp[i]++;
  }

  console.log(dp[n]);
}
