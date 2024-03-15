// 함께 블록 쌓기

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

solve(input);

function solve(input) {
  // N: 학생 수, M: 최대 블록 개수, H: 목표 높이
  const [N, M, H] = input[0].split(' ').map(Number);
  // students[i] => i + 1번 학생이 가지고 있는 블록의 높이 배열
  const students = input
    .slice(1, N + 1)
    .map((blocks) => blocks.split(' ').map(Number));

  // dp => 0 ~ H 높이까지 만들 수 있는 경우의 수
  let dp = Array(H + 1).fill(0);
  // 1번 학생 입력
  students[0].forEach((block) => {
    if (block > H) return;
    dp[block] = 1;
  });

  for (let i = 1; i < N; i++) {
    // 현재 학생이 블록을 쌓지 않는 경우 저장
    const tmp = [...dp];

    // 블록 쌓기
    students[i].forEach((block) => {
      if (block > H) return;
      // 이전에 아무도 블록을 안 쌓은 경우
      tmp[block]++;

      // 이전에 쌓은 블록에 이어서 쌓기
      for (let prevHeight = 1; prevHeight < H; prevHeight++) {
        // 목표 높이 초과
        if (block + prevHeight > H) break;
        // 이전에 현재 높이까지 쌓지 않은 경우 패스
        if (!dp[prevHeight]) continue;

        // 다음 높이는 이전에 쌓은 높이 + 현재 블록 => 해당 경우의 수만큼 더하기
        tmp[block + prevHeight] += dp[prevHeight];
        tmp[block + prevHeight] %= 10007;
      }
    });

    // 현재까지 경우의 수 업데이트
    dp = tmp;
  }

  console.log(dp[H]);
}
