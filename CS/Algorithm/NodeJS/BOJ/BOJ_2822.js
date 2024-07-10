function solution(input) {
  const selectedScores = input.slice(0, 5).sort((a, b) => a[1] - b[1]);

  const answer = [0, []];
  for (let i = 0; i < 5; i++) {
    answer[0] += selectedScores[i][0];
    answer[1].push(selectedScores[i][1]);
  }

  return `${answer[0]}\n${answer[1].join(' ')}`;
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .split('\n')
  .map((num, i) => [+num, i + 1])
  .sort((a, b) => b[0] - a[0]);

console.log(solution(input));
