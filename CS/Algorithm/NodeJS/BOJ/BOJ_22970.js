function solution(input) {
  const N = +input[0];
  const nums = input[1].trim().split(' ').map(Number);

  // up[i] => i가 꼭대기일 때 증가 길이 저장
  const up = Array(N).fill(1);
  for (let i = 1; i < N; i++) {
    if (nums[i] > nums[i - 1]) up[i] = up[i - 1] + 1;
  }

  // down[i] => i가 꼭대기일 때 감소 길이 저장
  const down = Array(N).fill(1);
  for (let i = N - 2; i >= 0; i--) {
    if (nums[i] > nums[i + 1]) down[i] = down[i + 1] + 1;
  }

  // answer[i] => i가 꼭대기일 때 길이
  const answer = [];
  for (let i = 0; i < N; i++) {
    answer[i] = up[i] + down[i] - 1;
  }

  // 최댓값 출력
  console.log(Math.max(...answer));
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');
solution(input);
