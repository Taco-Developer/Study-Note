// 색종이
function solution(papers) {
  const whitePaper = Array.from({ length: 100 }, () => Array(100).fill(0));

  papers.forEach(([x, y]) => {
    for (let ny = y; ny < y + 10; ny++) {
      for (let nx = x; nx < x + 10; nx++) {
        whitePaper[ny][nx] = 1;
      }
    }
  });

  let ans = 0;

  for (let y = 0; y < 100; y++) {
    for (let x = 0; x < 100; x++) {
      if (whitePaper[y][x]) ans++;
    }
  }

  return ans;
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const paperCnt = Number(input[0]);
const papers = input.slice(1, paperCnt + 1).map((data) =>
  data
    .trim()
    .split(' ')
    .map((num) => Number(num) - 1)
);

console.log(solution(papers));
