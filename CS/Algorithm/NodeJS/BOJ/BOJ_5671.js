function solution(input) {
  const cnts = [0];
  for (let i = 1; i <= 5000; i++) {
    const num = String(i);

    if (num.length === new Set(num.split('')).size) {
      cnts[i] = cnts[i - 1] + 1;
      continue;
    }

    cnts[i] = cnts[i - 1];
  }

  const answer = [];
  input.forEach((row) => {
    const [N, M] = row.split(' ').map(Number);
    answer.push(cnts[M] - cnts[N - 1]);
  });

  console.log(answer.join('\n'));
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');
solution(input);
