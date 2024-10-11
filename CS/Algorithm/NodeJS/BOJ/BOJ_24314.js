function solution(input) {
  const [a1, a0] = input[0].split(' ').map(Number);
  const c = +input[1];
  const n0 = +input[2];

  // f(x)의 기울기가 g(x)의 기울기와 같거나 크면서 f(n0)가 g(n0)보다 커야함
  const answer = a1 >= c && a1 * n0 + a0 >= c * n0 ? 1 : 0;
  console.log(answer);
}

const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
