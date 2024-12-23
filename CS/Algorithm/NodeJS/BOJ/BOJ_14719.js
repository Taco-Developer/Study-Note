function solution(input) {
  const [_, W] = input[0].split(' ').map(Number);
  const blocks = input[1].split(' ').map(Number);

  let answer = 0;

  // 현재 위치의 왼쪽 최댓값(왼쪽 벽), 오른쪽 최댓값(오른쪽 벽) 중에서 작은 값이 현재 위치 보다 크다면 물이 고임
  for (let i = 1; i < W - 1; i++) {
    const leftMax = Math.max(...blocks.slice(0, i));
    const rightMax = Math.max(...blocks.slice(i + 1));
    const minMax = Math.min(leftMax, rightMax);

    if (minMax <= blocks[i]) continue;

    answer += minMax - blocks[i];
  }

  console.log(answer);
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath, 'utf-8').toString().trim().split('\n');

solution(input);
