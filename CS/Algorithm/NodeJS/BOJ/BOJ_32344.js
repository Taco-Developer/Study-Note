function solution(input) {
  const N = +input[1];

  // squares[i] => [가장 위 행, 가장 왼쪽 열, 가장 아래 행, 가장 오른쪽 열]
  const squares = Array.from({ length: N + 1 }, () => Array(4).fill(0));

  for (let i = 2; i < N + 2; i++) {
    const [a, v, h] = input[i].split(' ').map(Number);
    if (squares[a][0] === 0 || squares[a][0] > v) squares[a][0] = v;
    if (squares[a][1] === 0 || squares[a][1] > h) squares[a][1] = h;
    if (squares[a][2] < v) squares[a][2] = v;
    if (squares[a][3] < h) squares[a][3] = h;
  }

  const answer = squares
    .map((square, index) => [
      index,
      square[0] === 0
        ? 0
        : (square[2] - square[0] + 1) * (square[3] - square[1] + 1),
    ]) // 넓이 계산
    .filter((square) => square[1] > 0) // 유물이 있는 경우만 확인 (넓이가 0보다 큰 경우)
    .sort((a, b) => {
      if (a[1] === b[1]) return a[0] - b[0];
      return b[1] - a[1];
    }) // 넓이가 큰 순으로 넓이가 같다면 번호가 작은 순으로
    [0].join(' ');

  console.log(answer);
}

const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
