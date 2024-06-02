function solution(input) {
  const answer = new Set();
  answer.add('ChongChong');

  input.forEach((log) => {
    const [person1, person2] = log.trim().split(' ');
    if (answer.has(person1) || answer.has(person2)) {
      answer.add(person1);
      answer.add(person2);
    }
  });

  return answer.size;
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .slice(1);
console.log(solution(input));
