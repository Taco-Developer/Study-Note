function solution(input) {
  const N = +input[0];

  // 시작점(내림차순), 끝점(오름차순)
  const lines = input
    .slice(1)
    .map((row) => row.split(' ').map(Number))
    .sort((a, b) => {
      if (a[0] === b[0]) return b[1] - a[1];
      return a[0] - b[0];
    });

  let answer = 0;

  // 선의 시작과 끝
  let [start, end] = lines[0];
  answer += end - start;

  for (let i = 1; i < N; i++) {
    // 시작점이 같은 경우(더 긴 선을 이미 확인함), 이전에 그은 선에 완전히 포함되는 경우 패스
    if (start === lines[i][0] || end >= lines[i][1]) continue;

    // 이전에 그은 선과 일부 겹쳐진 경우
    if (end >= lines[i][0] && end < lines[i][1]) {
      answer += lines[i][1] - end;
      end = lines[i][1];
      continue;
    }

    // 이전에 그은 선과 완전히 떨어져 있는 경우
    if (end < lines[i][0]) {
      [start, end] = lines[i];
      answer += end - start;
    }
  }

  console.log(answer);
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath, 'utf-8').toString().trim().split('\n');

solution(input);
