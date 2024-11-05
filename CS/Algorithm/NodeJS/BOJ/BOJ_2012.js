function solution(input) {
  // 예상 순위대로 정렬
  const ranks = input
    .slice(1)
    .map(Number)
    .sort((a, b) => a - b);

  // index + 1이 임의로 매겨진 등수
  const answer = ranks.reduce(
    (sum, now, index) => sum + Math.abs(now - index - 1),
    0
  );

  console.log(answer);
}

const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
