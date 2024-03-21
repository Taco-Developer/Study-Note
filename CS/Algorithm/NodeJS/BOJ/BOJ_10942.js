// 팰린드롬?

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

solve(input);

function solve(input) {
  const N = Number(input[0]);
  const board = input[1].trim().split(' ').map(Number);
  const M = Number(input[2]);

  // dp[S][E] => S부터 E까지 팰린드롬 여부 (0 => 아님, 1 => 맞음)
  // S+1부터 E-1까지 팰린드롬이라면 board[S] === board[E]은 경우 S부터 E까지도 팰린드롬
  // => 내부가 팰린드롬인 경우 시작과 끝이 같다면 역시 팰린드롬
  // 길이가 1인 경우 무조건 팰린드롬이고 길이가 2인 경우 S+1부터 E-1까지 범위는 내부가 아님
  // => 1로 초기화
  const dp = Array.from({ length: N }, () => Array(N).fill(1));

  // S와 E 값을 N에서 줄여가면서 확인
  for (let S = N - 1; S > -1; S--) {
    for (let E = N - 1; E > S; E--) {
      // 시작과 끝이 다름
      if (board[S] !== board[E]) {
        dp[S][E] = 0;
        continue;
      }

      // 시작과 끝이 같은 경우 내부 팰린드롬 여부 확인
      dp[S][E] = dp[S + 1][E - 1];
    }
  }

  const ans = [];
  input.slice(3, M + 3).forEach((question) => {
    const [S, M] = question.split(' ').map((num) => Number(num) - 1);
    ans.push(dp[S][M]);
  });

  console.log(ans.join('\n'));
}
