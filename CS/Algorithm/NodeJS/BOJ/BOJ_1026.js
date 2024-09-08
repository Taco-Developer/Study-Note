function solution(input) {
  const N = +input[0];

  // B의 내림차순으로 A의 오름차순 값을 곱하면 최솟값
  const A = input[1]
    .trim()
    .split(' ')
    .map(Number)
    .sort((a, b) => a - b);

  const B = input[2]
    .trim()
    .split(' ')
    .map(Number)
    .sort((a, b) => b - a);

  let answer = 0;
  for (let i = 0; i < N; i++) {
    answer += A[i] * B[i];
  }

  console.log(answer);
}
const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
