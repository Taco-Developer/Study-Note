function solution(input) {
  const answer = [];
  input.forEach(([N, M]) => {
    N = N > M - N ? M - N : N;

    let cnt = 1;
    for (let i = 1; i <= N; i++) {
      cnt *= M - i + 1;
      cnt /= i;
    }

    answer.push(cnt);
  });

  return answer.join('\n');
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .slice(1)
  .map((input) => input.split(' ').map(Number));
console.log(solution(input));
