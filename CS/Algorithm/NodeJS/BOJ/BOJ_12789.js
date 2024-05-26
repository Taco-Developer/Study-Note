function solution(nums) {
  let numsIdx = 0;
  const stack = [];

  for (let target = 1; target <= nums.length; target++) {
    // 스택의 마지막이 현재 간식 받을 학생인 경우
    if (stack[stack.length - 1] === target) {
      stack.pop();
      continue;
    }

    // 현재 대기열에서 현재 받아야 하는 학생이 나올 때까지 스택에 학생 넣기
    while (numsIdx < nums.length && nums[numsIdx] !== target) {
      stack.push(nums[numsIdx]);
      numsIdx++;
    }

    // 현재 대기열에서 현재 받아야 하는 학생이 나온 경우
    if (numsIdx < nums.length) {
      numsIdx++;
      continue;
    }

    // 현재 받아야 하는 학생이 나오지 않은 경우
    return 'Sad';
  }

  return 'Nice';
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .split('\n')[1]
  .split(' ')
  .map(Number);
console.log(solution(input));
