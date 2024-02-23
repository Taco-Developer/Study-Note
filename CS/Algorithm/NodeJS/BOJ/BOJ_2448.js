const N = +require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString();

solve(N);

function solve(N) {
  const rowLength = (N / 3) * 5 + N / 3 - 1;
  const paper = Array.from({ length: N }, () => Array(rowLength).fill(' '));
  pickPosition(N, 0, 0);
  console.log(paper.map((row) => row.join('')).join('\n'));

  // 별 찍을 위치를 고르기
  function pickPosition(size, y, x) {
    // size가 3인 경우 별 찍기
    if (size === 3) {
      drawStar(y, x);
      return;
    }

    // 위, 왼쪽, 오른쪽 별 찍기
    // 위 => 왼쪽에 별을 찍으므로 위치를 size / 2만큼 오른쪽으로 이동
    pickPosition(size / 2, y, x + size / 2);
    // 왼쪽 => 위에 별을 찍으므로 위치를 size / 2만큼 아래로 이동
    pickPosition(size / 2, y + size / 2, x);
    // 오른쪽 => 위와 왼쪽에 별을 찍으므로 size / 2만큼 아래로, size만큼 오른쪽으로 이동
    pickPosition(size / 2, y + size / 2, x + size);
  }

  // y, x를 기준으로 크기가 3인 별 찍기
  function drawStar(y, x) {
    // 첫 번째 줄
    paper[y][x + 2] = '*';
    // 두 번째 줄
    paper[y + 1][x + 1] = '*';
    paper[y + 1][x + 3] = '*';
    // 세 번째 줄
    for (let i = 0; i < 5; i++) {
      paper[y + 2][x + i] = '*';
    }
  }
}
