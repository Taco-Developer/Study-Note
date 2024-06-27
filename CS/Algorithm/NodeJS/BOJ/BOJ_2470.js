function solution(input) {
  const N = +input[0];
  const nums = input[1]
    .trim()
    .split(' ')
    .map(Number)
    .sort((a, b) => a - b);

  if (nums[0] > 0) return `${nums[0]} ${nums[1]}`;
  if (nums[N - 1] < 0) return `${nums[N - 2]} ${nums[N - 1]}`;

  const answer = [Math.abs(nums[0] + nums[N - 1]), 0, N - 1];
  const last = N - 1;

  // 용액 중 하나를 선정
  for (let i = 0; i < last; i++) {
    let start = i + 1;
    let end = last;

    while (start <= end) {
      const mid = Math.floor((start + end) / 2);
      const diff = Math.abs(nums[i] + nums[mid]);

      if (diff === 0) return `${nums[i]} ${nums[mid]}`;

      // 이전과 다음 위치의 값이랑 비교해서 차이가 최소인지 확인
      if (mid < end && diff > Math.abs(nums[i] + nums[mid + 1])) {
        start = mid + 1;
        continue;
      }

      if (mid > start && diff > Math.abs(nums[i] + nums[mid - 1])) {
        end = mid - 1;
        continue;
      }

      if (diff < answer[0]) {
        answer[0] = diff;
        answer[1] = i;
        answer[2] = mid;
      }
      break;
    }
  }

  return `${nums[answer[1]]} ${nums[answer[2]]}`;
}

function solution2(input) {
  const N = +input[0];
  const nums = input[1]
    .trim()
    .split(' ')
    .map(Number)
    .sort((a, b) => a - b);

  if (nums[0] > 0) return `${nums[0]} ${nums[1]}`;
  if (nums[N - 1] < 0) return `${nums[N - 2]} ${nums[N - 1]}`;

  const answer = [Infinity, -1, -1];

  let left = 0;
  let right = N - 1;
  while (left < right) {
    const sum = nums[left] + nums[right];

    if (Math.abs(sum) < answer[0]) {
      answer[0] = Math.abs(sum);
      answer[1] = left;
      answer[2] = right;
    }

    if (sum === 0) return `${nums[left]} ${nums[right]}`;
    else if (sum < 0) left++;
    else right--;
  }

  return `${nums[answer[1]]} ${nums[answer[2]]}`;
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');
console.log(solution2(input));
