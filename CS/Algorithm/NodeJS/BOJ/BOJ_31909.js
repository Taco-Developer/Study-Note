function solution(input) {
  const P = input[1].trim().split(' ');
  const K = +input[2];

  // 가능한 2**i + 2**j 경우 저장
  const sums = {};
  for (let i = 0; i < 7; i++) {
    for (let j = i + 1; j < 8; j++) {
      sums[2 ** i + 2 ** j] = [i, j];
    }
  }

  // 각 key의 위치 저장
  const keys = {};
  for (let i = 0; i < 8; i++) {
    keys[i] = i;
  }

  // 명령 실행
  P.forEach((sum) => {
    if (!sums[sum]) return;
    const [left, right] = sums[sum];
    [keys[left], keys[right]] = [keys[right], keys[left]];
  });

  console.log(keys[K]);
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');
solution(input);
