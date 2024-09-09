function solution(input) {
  const [N, M, K] = input[0].split(' ').map(Number);

  // 각 참가자의 최대 능력을 저장
  const peopleMaxScoreMap = {};
  for (let i = 1; i <= M; i++) {
    const data = input[i].trim().split(' ');
    for (let j = 0; j < N * 2; j += 2) {
      peopleMaxScoreMap[data[j]] = Math.max(
        peopleMaxScoreMap[data[j]] ?? 0,
        +data[j + 1]
      );
    }
  }

  // 최대 능력을 내림차순 정렬 후 처음부터 K개를 더하고 소수점 첫째자리까지 반올림
  const scores = Object.values(peopleMaxScoreMap).sort((a, b) => b - a);
  const answer = scores
    .slice(0, K)
    .reduce((sum, score) => sum + score, 0)
    .toFixed(1);

  console.log(answer);
}
const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
