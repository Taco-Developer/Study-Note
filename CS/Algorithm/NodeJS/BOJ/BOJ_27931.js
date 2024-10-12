function solution(input) {
  const N = +input[0];
  const nums = input[1]
    .trim()
    .split(' ')
    .map(Number)
    .sort((a, b) => a - b);

  // answer => 0: 짝수 최솟값, 1: 홀수 최솟값
  const answer = [Infinity, Infinity];

  // lastCheckedNums => 0: 마지막으로 확인한 짝수, 1: 마지막으로 확인한 홀수
  const lastCheckedNums = [null, null];

  for (let i = 0; i < N; i++) {
    // 현재 숫자가 짝수인 경우 0, 홀수인 경우 1
    const isOdd = nums[i] % 2 ? 1 : 0;

    // 1 - isOdd => 홀수인 경우 짝수를 확인하고 짝수인 경우 홀수를 확인함
    if (lastCheckedNums[1 - isOdd] !== null)
      // 홀수 - 짝수, 짝수 - 홀수 => 홀수
      answer[1] = Math.min(answer[1], nums[i] - lastCheckedNums[1 - isOdd]);

    // isOdd => 홀수인 경우 홀수를 확인하고 짝수인 경우 짝수를 확인함
    if (lastCheckedNums[isOdd] !== null)
      // 짝수 - 짝수, 홀수 - 홀수 => 짝수
      answer[0] = Math.min(answer[0], nums[i] - lastCheckedNums[isOdd]);

    // 마지막 확인 숫자 업데이트
    lastCheckedNums[isOdd] = nums[i];
  }

  // 짝수나 홀수가 나오지 않은 경우 -1로 변경
  for (let i = 0; i < 2; i++) {
    if (answer[i] === Infinity) answer[i] = -1;
  }

  console.log(answer.join(' '));
}

const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
