const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

solve(input);

function solve(input) {
  // 집의 개수
  const N = +input[0];
  const houses = input
    .slice(1, N + 1)
    .map((colors) => colors.trim().split(' ').map(Number));

  // 시작 색 고정 => 마지막 집에서 시작 색 선택 제외한 최솟값 확인
  // 최댓값이 1000이므로 시작하려는 색을 제외하고 2001로 초기화한다면 다른 색 시작의 경우 제외 가능
  const rStart = Array.from({ length: N }, () => [2001, 2001, 2001]);
  const gStart = Array.from({ length: N }, () => [2001, 2001, 2001]);
  const bStart = Array.from({ length: N }, () => [2001, 2001, 2001]);
  rStart[0][0] = houses[0][0];
  gStart[0][1] = houses[0][1];
  bStart[0][2] = houses[0][2];

  for (let i = 1; i < N; i++) {
    select(rStart, i);
    select(gStart, i);
    select(bStart, i);
  }

  console.log(
    Math.min(
      rStart[N - 1][1],
      rStart[N - 1][2],
      gStart[N - 1][0],
      gStart[N - 1][2],
      bStart[N - 1][0],
      bStart[N - 1][1]
    )
  );

  // 색 선택했을 때 비용 저장하는 함수
  function select(colorStart, i) {
    colorStart[i][0] =
      Math.min(colorStart[i - 1][1], colorStart[i - 1][2]) + houses[i][0];
    colorStart[i][1] =
      Math.min(colorStart[i - 1][0], colorStart[i - 1][2]) + houses[i][1];
    colorStart[i][2] =
      Math.min(colorStart[i - 1][0], colorStart[i - 1][1]) + houses[i][2];
  }
}
