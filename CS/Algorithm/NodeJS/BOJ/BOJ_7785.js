function solution(input) {
  const people = new Set();

  input.slice(1).forEach((log) => {
    const [name, status] = log.split(' ');

    if (status === 'enter') {
      people.add(name);
      return;
    }

    people.delete(name);
  });

  return Array.from(people).sort().reverse().join('\n');
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');
console.log(solution(input));
