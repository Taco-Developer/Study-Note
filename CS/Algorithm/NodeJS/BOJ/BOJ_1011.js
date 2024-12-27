function solution(input) {
  const T = +input[0];

  const answer = [];

  for (let t = 1; t <= T; t++) {
    const [x, y] = input[t].split(' ').map(Number);
    const distance = y - x;

    // 수열에서 가장 큰 수는 거리의 루트 값에서 정수부
    const maxNum = Math.floor(Math.sqrt(distance));

    // maxNum 제곱이 거리와 같은 경우 총 이동 횟수는 2 * maxNum - 1
    if (maxNum * maxNum === distance) answer.push(2 * maxNum - 1);
    // maxNum에 해당하는 거리는 maxNum 제곱과 일치하는 거리를 제외하고 총 maxNum * 2개가 있음
    // 앞의 maxNum개는 maxNum 제곱의 이동 횟수 + 1 = 2 * maxNum
    // 뒤의 maxNum개는 maxNum 제곱의 이동 횟수 + 2 = 2 * maxNum + 1
    else if (maxNum * maxNum < distance && distance <= maxNum * maxNum + maxNum)
      answer.push(2 * maxNum);
    else answer.push(2 * maxNum + 1);
  }

  console.log(answer.join('\n'));
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath, 'utf-8').toString().trim().split('\n');

solution(input);
