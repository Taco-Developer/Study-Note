function solution(input) {
  const [N, M] = input.map(Number);

  if (N === M) {
    console.log(1);
    return;
  }

  // 과일 종류 N개에서 중복을 허용해 M-N개를 뽑는 경우의 수
  // 각 종류는 무조건 1개가 있어야 하므로 M-N개를 뽑음
  // n H (m-n) => (m-n+n-1) C (n-1) => (m-1) C (n-1)

  let parent = 1; // 분모
  for (let i = N - 1; i > 1; i--) {
    parent *= i;
  }

  let child = 1; // 분자
  for (let i = 0; i < N - 1; i++) {
    child *= M - 1 - i;
  }

  console.log(child / parent);
}
const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
