const n = +require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString();

const ans = Array(n + 1).fill(0);
// 2 * 1 사각형을 채울 수 있는 경우 1개 => 2 * 1 타일 1개 사용
ans[1] = 1;
// 2 * 2 사각형을 채울 수 있는 경우 3개 => 2 * 1 타일 3개 사용 + 1 * 2 타일 2개 사용 + 2 * 2 타일 1개 사용
ans[2] = 3;

for (let i = 3; i < n + 1; i++) {
  // 마지막에 붙이는 타일을 세로로 놓는 경우와 가로로 놓는 경우
  // 세로로 놓는 경우 => ans[n-1] * (2 * 1 타일을 붙일 수 있는 경우 = 1)
  // 가로로 놓는 경우 => ans[n-2] * (1 * 2 타일을 사용하는 경우 + 2 * 2 타일을 사용하는 경우 = 2)
  ans[i] = (ans[i - 1] + ans[i - 2] * 2) % 10007;
}

console.log(ans[n]);
