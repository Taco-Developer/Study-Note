function solution(input) {
  const [N, _] = input[0].split(' ').map(Number);
  const S = new Set(input.slice(1, N + 1));

  let answer = 0;
  input.slice(N + 1).forEach((word) => {
    if (S.has(word)) answer++;
  });

  return answer;
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');
console.log(solution(input));
