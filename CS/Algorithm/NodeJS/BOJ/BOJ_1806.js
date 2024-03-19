// 부분합

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

solve(input);

function solve(input) {
  const [N, S] = input[0].split(' ').map(Number);
  const nums = input[1].trim().split(' ').map(Number);

  // 왼쪽 끝 위치
  let left = 0;
  // 오른쪽 끝 위치
  let right = 0;

  let sum = 0;
  // 최소 길이
  let min = N + 1;
  // 반복 종료 여부
  let isEnded = false;

  // 길이가 1이거나 반복 종료 표시가 있다면 종료
  while (min !== 1 && !isEnded) {
    pushNums();
    popNums();
  }

  console.log(min > N ? 0 : min);

  // 합계가 S 이상이 될 때까지 숫자 넣기
  function pushNums() {
    while (right < N && sum < S) {
      sum += nums[right];
      right++;
    }

    // 합계까 목표값에 도달하지 못하는 경우
    if (sum < S) {
      isEnded = true;
      return;
    }
  }

  // 합계가 S보다 작아질 때까지 숫자 빼기
  function popNums() {
    while (left < right && sum >= S) {
      // 최소 길이 확인
      min = Math.min(min, right - left);
      sum -= nums[left];
      left++;
    }
  }
}
