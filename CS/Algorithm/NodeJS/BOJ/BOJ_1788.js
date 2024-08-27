const MAX = 1000000000;

function solution(input) {
  const n = +input;
  const dp = [0, 1];

  // n: 양수
  if (n > 1) {
    for (let i = 2; i <= n; i++) {
      dp[i] = (dp[i - 1] + dp[i - 2]) % MAX;
    }
  }
  // n: 음수
  else if (n < -1) {
    for (let i = 2; i <= -n; i++) {
      dp[i] = dp[i - 2] - dp[i - 1];
      if (dp[i] < 0) dp[i] = -(-dp[i] % MAX);
      else if (dp[i] > 0) dp[i] = dp[i] % MAX;
    }
  }

  const value = dp[Math.abs(n)];
  const answer = Math.abs(value);

  if (value < 0) console.log(`-1\n${answer}`);
  else if (value === 0) console.log(`0\n${answer}`);
  else console.log(`1\n${answer}`);
}

const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString();

solution(input);
