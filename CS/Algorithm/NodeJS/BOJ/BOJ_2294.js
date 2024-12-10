function solution(input) {
  const [_, k] = input[0].split(' ').map(Number);
  const coins = input.slice(1).map(Number);

  // dp[i]: i원을 만들 수 있는 최소 코인의 개수
  const dp = Array(k + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= k; i++) {
    for (const coin of coins) {
      if (i - coin < 0) continue;
      // i원을 만들기 위해 i-coin원을 만들었던 최소 코인 개수에 현재 coin 1개를 추가(모든 코인을 비교해 최솟값 저장)
      dp[i] = Math.min(dp[i], dp[i - coin] + 1);
    }
  }

  console.log(dp[k] === Infinity ? -1 : dp[k]);
}
const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
