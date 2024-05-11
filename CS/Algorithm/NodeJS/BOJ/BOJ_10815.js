function solution(input) {
  const cards = new Set(input[1].trim().split(' '));

  const answer = [];

  input[3]
    .trim()
    .split(' ')
    .forEach((num) => {
      if (cards.has(num)) {
        answer.push(1);
        return;
      }

      answer.push(0);
    });

  return answer.join(' ');
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');
console.log(solution(input));
