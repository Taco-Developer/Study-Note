function solution(input) {
  const S = input[0].trim();
  const SLength = S.length;
  const q = +input[1];

  // dp[i] => 0 ~ i까지 각 알파벳의 횟수
  const dp = [];
  dp[0] = { [S[0]]: 1 };
  for (let i = 1; i < SLength; i++) {
    dp[i] = { ...dp[i - 1] };
    dp[i][S[i]] = (dp[i][S[i]] ?? 0) + 1;
  }

  const answer = [];

  for (let i = 2; i < q + 2; i++) {
    const [alphabet, l, r] = input[i].trim().split(' ');

    const totalCnt = dp[+r][alphabet] ?? 0;
    const beforeL = +l < 1 ? 0 : dp[+l - 1][alphabet] ?? 0;
    answer.push(totalCnt - beforeL);
  }

  console.log(answer.join('\n'));
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');
solution(input);
