function solution(input) {
  let [V, W, D] = input.split(' ').map(Number);

  // 속력 => 0.8, 시간 => 1.25
  // V = W / time => 0.8 * V = W / time * 0.8 = W / time * (4 / 5) = W / (time * 5 / 4) = W / (time * 1.25);
  let time = W / V;
  let answer = 0;
  while (true) {
    const distance = time * time * 5;
    if (distance >= D) break;

    D -= distance;
    time *= 1.25;
    answer++;
  }

  console.log(answer);
}

const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim();

solution(input);
