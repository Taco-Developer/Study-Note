function solution(input) {
  const [N, M, K] = input.map(Number);

  const dp = Array.from({ length: N }, () => Array(M).fill(0));
  for (let r = 1; r < N; r++) dp[r][0] = 1;
  for (let c = 1; c < M; c++) dp[0][c] = 1;

  // K가 0인 경우 1번에서 N*M까지 경우의 수 출력
  if (K === 0) {
    for (let r = 1; r < N; r++) {
      for (let c = 1; c < M; c++) {
        dp[r][c] = dp[r - 1][c] + dp[r][c - 1];
      }
    }

    console.log(dp[N - 1][M - 1]);
    return;
  }

  // K가 0이 아닌 경우 1번에서 K번까지 경우의 수 X K번에서 N*M까지 경우의 수 출력
  const KPosition = [Math.floor(K / M), (K % M) - 1];
  if (KPosition[1] === -1) {
    KPosition[0] -= 1;
    KPosition[1] = M - 1;
  }

  // 1번에서 K번까지 경우의 수 구하기
  for (let r = 1; r <= KPosition[0]; r++) {
    for (let c = 1; c <= KPosition[1]; c++) {
      dp[r][c] = dp[r - 1][c] + dp[r][c - 1];
    }
  }

  // K번에서 N*M번까지 경우의 수 구하기
  for (let r = KPosition[0] + 1; r < N; r++) dp[r][KPosition[1]] = 1;
  for (let c = KPosition[1] + 1; c < M; c++) dp[KPosition[0]][c] = 1;
  for (let r = KPosition[0] + 1; r < N; r++) {
    for (let c = KPosition[1] + 1; c < M; c++) {
      dp[r][c] = dp[r - 1][c] + dp[r][c - 1];
    }
  }

  console.log(dp[KPosition[0]][KPosition[1]] * dp[N - 1][M - 1]);
}

const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split(' ');

solution(input);
