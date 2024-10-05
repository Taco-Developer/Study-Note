function solution(input) {
  const people = 'Inseo, Junsuk, Jungwoo, Jinwoo, Youngki'.split(', ');
  const A = input.slice(0, 5).map((row) => row.trim().split(' ').map(Number));
  const B = input.slice(5).map((row) => row.trim().split(' ').map(Number));

  // workAmounts[x][y] => x번 사람이 y번째 일의 예상 일량
  const workAmounts = Array.from({ length: 5 }, () => Array(5).fill(0));
  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 5; y++) {
      for (let i = 0; i < 5; i++) {
        workAmounts[x][y] += A[x][i] * B[i][y];
      }
    }
  }

  // finalWorkAmounts[x] => x번 사람의 최종 일량
  const finalWorkAmounts = workAmounts.map((workNums) =>
    workNums.reduce((sum, cur) => sum + cur, 0)
  );

  // 최종 일량이 가작 작은 사람의 번호(같은 경우 번호가 큰 사람)
  let answer = 4;
  for (let i = 3; i >= 0; i--) {
    if (finalWorkAmounts[answer] > finalWorkAmounts[i]) answer = i;
  }

  console.log(people[answer]);
}
const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
