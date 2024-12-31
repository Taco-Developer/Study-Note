function solution(input) {
  const N = +input[0];
  const nums = input[1].split(' ').map(Number);
  const target = nums.pop();

  // dp[i][j]: i(인덱스)까지 숫자를 더해서 j를 만들 수 있는 경우의 수
  const dp = Array.from({ length: N - 1 }, () => Array(21).fill(0n));
  // 시작하는 수
  dp[0][nums[0]] = 1n;

  for (let numIdx = 1; numIdx < N - 1; numIdx++) {
    for (let now = 0; now <= 20; now++) {
      // 계산을 통해 now를 만들 수 있는 경우가 없음
      if (dp[numIdx - 1][now] === 0n) continue;

      // 더하기 결과
      const plus = now + nums[numIdx];
      if (plus <= 20) dp[numIdx][plus] += dp[numIdx - 1][now];

      // 빼기 결과
      const minus = now - nums[numIdx];
      if (minus >= 0) dp[numIdx][minus] += dp[numIdx - 1][now];
    }
  }

  console.log(dp[N - 2][target].toString());
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath, 'utf-8').toString().trim().split('\n');

solution(input);
