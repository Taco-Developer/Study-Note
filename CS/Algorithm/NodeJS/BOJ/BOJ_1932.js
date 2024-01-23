const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const n = +input[0];

// 삼각형
const triangle = [];

// 누적해서 더한 삼각형
const sumTriangle = [];

for (let i = 1; i <= n; i++) {
  triangle.push(
    input[i]
      .trim()
      .split(' ')
      .map((num) => +num)
  );
  sumTriangle.push(
    input[i]
      .trim()
      .split(' ')
      .map((num) => +num)
  );
}

// 위에서 아래로 내려가면서 최댓값 저장
for (let r = 0; r < n - 1; r++) {
  for (let c = 0; c < triangle[r].length; c++) {
    const now = sumTriangle[r][c];
    // 왼쪽 아래
    const left = triangle[r + 1][c];
    // 오른쪽 아래
    const right = triangle[r + 1][c + 1];

    // 최댓값 저장
    sumTriangle[r + 1][c] = Math.max(sumTriangle[r + 1][c], now + left);
    sumTriangle[r + 1][c + 1] = Math.max(
      sumTriangle[r + 1][c + 1],
      now + right
    );
  }
}

console.log(Math.max(...sumTriangle[n - 1]));
