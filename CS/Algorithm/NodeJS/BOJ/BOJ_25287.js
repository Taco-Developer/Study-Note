const YES = 'YES';
const NO = 'NO';

function solution(input) {
  // 숫자 변경 함수
  const changeNum = (numsLen, num) => {
    return numsLen - num + 1;
  };

  // 감소하지 않는 수열 가능 여부 확인 함수
  const checkIsPossible = (numsLen, nums) => {
    for (let i = 1; i < numsLen; i++) {
      const changedNum = changeNum(numsLen, nums[i]);

      if (nums[i] < nums[i - 1]) {
        if (changedNum >= nums[i - 1]) {
          nums[i] = changedNum;
          continue;
        }

        return false;
      }

      if (changedNum >= nums[i - 1]) nums[i] = Math.min(nums[i], changedNum);
    }

    return true;
  };

  const T = +input[0];

  const answer = [];

  let inputIdx = 1;
  for (let t = 0; t < T; t++) {
    const N = +input[inputIdx++];

    // 숫자가 하나만 있는 경우 무조건 YES
    if (N === 1) {
      answer.push(YES);
      inputIdx++;
      continue;
    }

    const nums = input[inputIdx++].trim().split(' ').map(Number);
    nums[0] = Math.min(nums[0], changeNum(N, nums[0])); // 시작 숫자는 작은 숫자로 변경

    answer.push(checkIsPossible(N, nums) ? YES : NO);
  }

  console.log(answer.join('\n'));
}

const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';

const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
