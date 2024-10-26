function solution(input) {
  const N = +input[0];

  const students = input
    .slice(1)
    .map((student) => student.trim().split(' ').map(Number))
    .sort((a, b) => {
      if (a[0] === b[0]) return a[1] - b[1];
      return b[0] - a[0];
    });

  let answer = 0;
  for (let i = 5; i < N; i++) {
    if (students[4][0] !== students[i][0]) break;
    answer++;
  }

  console.log(answer);
}

const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
