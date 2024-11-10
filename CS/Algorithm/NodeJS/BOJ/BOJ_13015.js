function solution(input) {
  const N = +input;

  const answer = Array.from({ length: N * 2 - 1 }, () => '');

  // 처음과 마지막
  answer[0] = answer[N * 2 - 2] =
    '*'.repeat(N) + ' '.repeat(2 * (N - 1) - 1) + '*'.repeat(N);

  // 가운데
  answer[N - 1] =
    ' '.repeat(N - 1) + '*' + ' '.repeat(N - 2) + '*' + ' '.repeat(N - 2) + '*';

  // 두 번째에서 마지막 전 (가운데 제외)
  for (let i = 1; i < N - 1; i++) {
    answer[N - 1 - i] =
      ' '.repeat(N - 1 - i) +
      '*' +
      ' '.repeat(N - 2) +
      '*' +
      ' '.repeat(2 * i - 1) +
      '*' +
      ' '.repeat(N - 2) +
      '*';
    answer[N - 1 + i] = answer[N - 1 - i];
  }

  console.log(answer.join('\n'));
}

const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim();

solution(input);
