function solution(input) {
  let N = +input[0];
  const machines = input[1]
    .trim()
    .split(' ')
    .map(BigInt)
    .sort((a, b) => {
      if (a > b) return 1;
      else if (a === b) return 0;
      return -1;
    });

  let answer = 0n;
  if (N & 1) {
    answer = machines.pop();
    N--;
  }

  for (let i = 0; i < N >> 1; i++) {
    const sum = machines[i] + machines[N - 1 - i];
    if (answer < sum) answer = sum;
  }

  console.log(answer.toString());
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');
solution(input);
