function solution(input) {
  const fibo = [1n, 1n, 2n];
  let fiboLastIdx = 2;

  const getFibo = (target) => {
    while (fibo[fiboLastIdx] <= target) {
      fibo.push(fibo[fiboLastIdx] + fibo[fiboLastIdx - 1]);
      fiboLastIdx++;
    }
  };

  const answer = [];

  let inputIdx = 0;
  while (true) {
    const [a, b] = input[inputIdx++].split(' ').map(BigInt);
    if (a === 0n && b === 0n) break;

    // b까지 피보나치 구하기
    getFibo(b);

    let start = 0;
    // a보다 크거나 같은 피보나치 중 가장 작은 idx 구하기
    for (let i = 1; i <= fiboLastIdx; i++) {
      if (fibo[i] < a) continue;
      start = i;
      break;
    }

    let end = 0;
    // b보다 작거나 같은 피보나치 중 가장 큰 idx 구하기
    for (let i = start; i <= fiboLastIdx; i++) {
      if (fibo[i] <= b) continue;
      end = i - 1;
      break;
    }

    answer.push(end - start + 1);
  }

  console.log(answer.join('\n'));
}
const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
