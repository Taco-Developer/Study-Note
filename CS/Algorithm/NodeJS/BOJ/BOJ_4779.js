// DP
function solution1(input) {
  const dp = ['-'];

  for (let i = 1; i <= 12; i++) {
    dp[i] = dp[i - 1] + ' '.repeat(dp[i - 1].length) + dp[i - 1];
  }

  const answer = [];

  input.forEach((N) => {
    answer.push(dp[N]);
  });

  return answer.join('\n');
}

// 분할 정복, 재귀
function solution2(input) {
  input = input.map((N) => 3 ** N);

  const cantorSet = (arr, start, len) => {
    if (len === 1) return;

    const nextLen = len / 3;
    cantorSet(arr, start, nextLen);
    cantorSet(arr, start + nextLen * 2, nextLen);

    for (let i = start + nextLen; i < start + nextLen * 2; i++) arr[i] = ' ';
  };

  const answer = [];

  input.forEach((len) => {
    const arr = Array(len).fill('-');
    cantorSet(arr, 0, len);
    answer.push(arr.join(''));
  });

  return answer.join('\n');
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number);
console.log(solution1(input));
console.log(solution2(input));
