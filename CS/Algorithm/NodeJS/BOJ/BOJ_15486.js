function solution(input) {
  const N = +input[0];

  const works = input.slice(1).map((row) => row.trim().split(' ').map(Number));

  const dp = Array(N + 1).fill(0);

  // 이전 최대 금액
  let prevMax = 0;
  for (let now = 0; now < N; now++) {
    // 현재 날짜에 저장된 금액 보다 이전 금액이 더 클 수 있으므로 최댓값 저장
    prevMax = Math.max(prevMax, dp[now]);

    const [time, price] = works[now];

    // 퇴사일 전까지 일을 끝낼 수 없음
    if (now + time > N) continue;

    // now + time에 저장된 금액과 이전 최대 금액 + 현재 금액 중 최댓값을 저장
    dp[now + time] = Math.max(dp[now + time], prevMax + price);
  }

  console.log(Math.max(prevMax, dp[N]));
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath, 'utf-8').toString().trim().split('\n');

solution(input);
