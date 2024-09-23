function solution(input) {
  const N = +input[0];

  // 중앙값 이후의 값은 연산에 필요하지 않으므로 제거
  const nums = input[1]
    .trim()
    .split(' ')
    .map(Number)
    .sort((a, b) => a - b)
    .slice(0, Math.floor((N + 1) / 2));

  // 중앙값이 연산 후 1이 되기 위해선 중앙값이 1이 되어야 하므로 중앙값 이전의 값 또한 모두 1이 됨
  // 즉, 모든 값이 1이 되기 위해 필요한 연산 횟수 + 1(0으로 만드는 연산) = 중앙값이 0이 되기 위해 필요한 연산 횟수
  const answer = nums.reduce((sum, now) => {
    let cnt = 0;

    while (now !== 1) {
      now = now >> 1;
      cnt++;
    }

    return sum + cnt;
  }, 1);

  console.log(answer);
}

const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
