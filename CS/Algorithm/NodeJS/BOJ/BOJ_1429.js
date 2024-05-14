function solution(input) {
  const answer = new Set(input[1].trim().split(' '));

  input[2]
    .trim()
    .split(' ')
    .forEach((num) => {
      if (answer.has(num)) {
        answer.delete(num);
        return;
      }

      answer.add(num);
    });

  return answer.size;
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');
console.log(solution(input));
