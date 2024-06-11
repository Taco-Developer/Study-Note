function solution(input) {
  const wireCnt = +input[0];
  const wireData = input
    .slice(1)
    .map((data) => data.trim().split(' ').map(Number))
    .sort((a, b) => a[0] - b[0]);

  // dp[i] => i + 1번째 전깃줄이 연결될 경우 교차되지 않는 최대값
  const dp = Array(wireCnt).fill(1);

  for (let i = 1; i < wireCnt; i++) {
    for (let j = 0; j < i; j++) {
      // 교차되지 않는 경우 최댓값 저장
      if (wireData[j][1] >= wireData[i][1]) continue;
      dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }

  console.log(wireCnt - Math.max(...dp));
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');
solution(input);
