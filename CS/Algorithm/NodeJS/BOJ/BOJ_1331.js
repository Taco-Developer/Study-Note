function solution(input) {
  const ACharCode = 'A'.charCodeAt();
  const board = Array.from({ length: 6 }, () => Array(6).fill(false));
  let visitedCnt = 0;
  const maxIdx = input.length;

  // 다음 위치로 갈 수 있는지 확인하는 함수
  const isGoPossible = (now, next) => {
    const numDistance = Math.abs(+now[1] - +next[1]);
    const alphaDistance = Math.abs(now[0].charCodeAt() - next[0].charCodeAt());

    if (
      (numDistance === 1 && alphaDistance === 2) ||
      (numDistance === 2 && alphaDistance === 1)
    )
      return true;

    return false;
  };

  // 다음 위치로 이동하는 함수
  const move = (next) => {
    const [y, x] = [+next[1] - 1, next[0].charCodeAt() - ACharCode];
    if (board[y][x]) return;

    board[y][x] = true;
    visitedCnt++;
  };

  // 시작점으로 이동
  move(input[0]);

  for (let i = 1; i < maxIdx; i++) {
    if (isGoPossible(input[i - 1], input[i])) {
      move(input[i]);
      continue;
    }

    // 다음 위치로 이동하지 못하는 경우
    console.log('Invalid');
    return;
  }

  // 모든 위치를 방문하지 않았거나 마지막 위치에서 시작 위치로 이동하지 못하는 경우
  if (visitedCnt !== 36 || !isGoPossible(input[maxIdx - 1], input[0])) {
    console.log('Invalid');
    return;
  }

  console.log('Valid');
}

const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
