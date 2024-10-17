function solution(input) {
  const N = +input[0];

  // 각 로봇의 파괴되는 시간 구하기
  const times = [];
  for (let i = 1; i <= N; i++) {
    const [X, Y, V] = input[i].split(' ').map(Number);
    times.push([i, Math.sqrt(X * X + Y * Y) / V]);
  }

  // 시간 순서로 정렬
  times.sort((a, b) => {
    if (a[1] === b[1]) return a[0] - b[0];
    return a[1] - b[1];
  });

  console.log(times.map((data) => data[0]).join('\n'));
}

const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
