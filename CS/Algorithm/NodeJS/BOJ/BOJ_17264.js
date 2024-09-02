function solution(input) {
  let inputIdx = 0;

  const WIN = 'I AM NOT IRONMAN!!';
  const LOOSE = 'I AM IRONMAN!!';

  const [N, P] = input[inputIdx++].split(' ').map(Number);
  const [W, L, G] = input[inputIdx++].split(' ').map(Number);

  const winUsers = new Set();
  for (let i = 0; i < P; i++) {
    const [name, result] = input[inputIdx++].split(' ');
    if (result === 'W') winUsers.add(name);
  }

  let score = 0;
  for (let i = 0; i < N; i++) {
    const name = input[inputIdx++];

    if (winUsers.has(name)) score += W;
    else score = Math.max(0, score - L);

    if (score >= G) {
      console.log(WIN);
      return;
    }
  }

  console.log(LOOSE);
}

const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
