// 병사 배치하기

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

solve(input);

function solve(input) {
  const N = Number(input[0]);
  const people = input[1].trim().split(' ').map(Number);

  // dp[i] => i + 1번 병사까지 있는 경우 i + 1번 병사로 끝나는 내림차순 배열 최대 길이
  // i + 1번 병사만 있는 경우인 1로 초기화
  const dp = Array(N).fill(1);

  for (let i = 1; i < N; i++) {
    // i 병사와 i 이전인 j 병사와 비교해 i 병사 전투력이 더 작다면
    // j로 끝나는 내림차순 병사 배열 마지막에 i 추가
    // 모든 이전 병사를 비교해 내림차순 배열 길이가 최대가 되는 길이 저장
    for (let j = 0; j < i; j++) {
      if (people[i] < people[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  console.log(N - Math.max(...dp));
}
