function solution(input) {
  const N = +input;

  const answer = [];
  let max = N;
  let min = 1;
  for (let i = 0; i < N; i++) {
    answer.push(i % 2 === 0 ? max-- : min++);
  }

  console.log(answer.join(' '));
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString();
solution(input);
