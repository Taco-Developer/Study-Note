// 극장 좌석

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

solve(input);

function solve(input) {
  const N = Number(input[0]);
  const M = Number(input[1]);

  const selectedSeats = Array(N + 1).fill(false);
  input.slice(2, M + 2).forEach((seat) => {
    selectedSeats[seat] = true;
  });

  // dp[i] => 좌석이 i까지 있는 경우 => [전체 경우의 수, i번이 i좌석에 있는 경우의 수]
  // i번이 i좌석에 있는 경우의 수 = i와 i+1이 교환할 수 있는 경우의 수 
  const dp = [];
  dp[1] = [1, 1];

  for (let i = 2; i <= N; i++) {
    dp[i] = [
      selectedSeats[i] || selectedSeats[i - 1]
        ? dp[i - 1][0]
        : dp[i - 1][0] + dp[i - 1][1],
      dp[i - 1][0],
    ];
  }

  console.log(dp[N][0]);
}
