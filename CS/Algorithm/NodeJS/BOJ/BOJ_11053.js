const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const size = +input[0];
const A = input[1]
  .trim()
  .split(' ')
  .map((num) => +num);

// 각 인덱스 길이에서 만들 수 있는 최대 길이 저장
// 각 인덱스에 위치한 값 1개로 본인만 포함하는 수열을 만들 수 있으므로 1로 초기화
const dp = Array(size).fill(1);

for (let i = 1; i < size; i++) {
  // 현재 값보다 작은 값으로 만들 수 있는 수열 길이 저장
  const small = [];

  for (let j = 0; j < i; j++) {
    if (A[i] > A[j]) {
      small.push(dp[j]);
    }
  }

  // 현재 값보다 작은 값이 있다면 만들 수 있는 수열 중 가장 긴 길이 + 1
  if (small.length !== 0) dp[i] = Math.max(...small) + 1;
}

console.log(Math.max(...dp));
