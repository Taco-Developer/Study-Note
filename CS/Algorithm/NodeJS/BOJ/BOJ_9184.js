function solution(input) {
  const answer = [];

  const dp = {};

  const w = (a, b, c) => {
    if (a <= 0 || b <= 0 || c <= 0) return 1;

    const key = `${a} ${b} ${c}`;

    if (dp[key]) return dp[key];

    if (a > 20 || b > 20 || c > 20) dp[key] = w(20, 20, 20);
    else if (a < b && b < c)
      dp[key] = w(a, b, c - 1) + w(a, b - 1, c - 1) - w(a, b - 1, c);
    else
      dp[key] =
        w(a - 1, b, c) +
        w(a - 1, b - 1, c) +
        w(a - 1, b, c - 1) -
        w(a - 1, b - 1, c - 1);

    return dp[key];
  };

  input.forEach(([a, b, c]) => {
    answer.push(`w(${a}, ${b}, ${c}) = ${w(a, b, c)}`);
  });

  console.log(answer.join('\n'));
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((row) => row.trim().split(' ').map(Number));
solution(input.slice(0, input.length - 1));
