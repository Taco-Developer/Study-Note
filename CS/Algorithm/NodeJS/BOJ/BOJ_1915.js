function solution(input) {
  const N = +input;
  const NLen = input.length;

  let answer = (N - 10 ** (NLen - 1) + 1) * NLen;
  for (let i = 1; i < NLen; i++) {
    answer += 9 * 10 ** (i - 1) * i;
  }

  console.log(answer % 1234567);
}

const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim();

solution(input);
