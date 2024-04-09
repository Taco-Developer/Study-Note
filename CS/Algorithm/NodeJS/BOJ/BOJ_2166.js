// 다각형의 면적 - 신발끈 공식, CCW

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

solve();

function solve() {
  const N = Number(input[0]);
  const positions = input
    .slice(1)
    .map((position) => position.trim().split(' ').map(Number));

  let ans = 0;
  // |(x1y2 + x2y3 + ... + xny1) - (x2y1 + x3y2 + ... + x1yn)| * 0.5 => 다각형의 넓이
  for (let i = 0; i < N; i++) {
    ans +=
      positions[i][0] * positions[(i + 1) % N][1] -
      positions[(i + 1) % N][0] * positions[i][1];
  }
  console.log((Math.abs(ans) * 0.5).toFixed(1));
}
