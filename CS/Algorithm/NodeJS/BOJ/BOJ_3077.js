function solution(input) {
  const N = +input[0];

  const answerMap = {};
  input[1]
    .trim()
    .split(' ')
    .forEach((answer, i) => {
      answerMap[answer] = i;
    });

  let answer = 0;
  const hyeons = input[2].trim().split(' ');
  for (let i = 0; i < N - 1; i++) {
    for (let j = i + 1; j < N; j++) {
      if (answerMap[hyeons[i]] < answerMap[hyeons[j]]) answer++;
    }
  }

  console.log(`${answer}/${(N * (N - 1)) / 2}`);
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');
solution(input);
