function solution(input) {
  const N = +input[0];
  const winScore = (N + 1) / 2;

  const jueon = input[1]
    .trim()
    .split(' ')
    .map(Number)
    .sort((a, b) => a - b);

  const sajang = input[2]
    .trim()
    .split(' ')
    .map(Number)
    .sort((a, b) => a - b);

  // 주언이가 이길 수 있으려면 무조건 ((N+1) / 2)번을 이겨야 함
  // 사장은 가장 큰 수부터 내고 주언이는 ((N+1) / 2)번째로 작은 수부터 냈을 때 ((N + 1) / 2)번 이길 수 있는 경우 YES
  for (let i = 0; i < winScore; i++) {
    if (sajang[N - 1 - i] > jueon[winScore - 1 - i]) continue;

    console.log('NO');
    return;
  }

  console.log('YES');
}

const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
