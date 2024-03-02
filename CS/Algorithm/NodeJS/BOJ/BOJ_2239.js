const sudoku = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((row) => row.trim().split('').map(Number));

solve();

function solve() {
  let ans = '';
  fillNum(0, 0);
  console.log(ans);

  function fillNum(y, x) {
    // 다음 줄 첫 번째 칸으로 이동
    if (x === 9) return fillNum(y + 1, 0);

    // 모든 줄, 모든 칸 다 채운 경우 종료
    if (y === 9) {
      ans = sudoku.map((row) => row.join('')).join('\n');
      // 스도쿠가 모두 채워진 경우 true 반환
      return true;
    }

    // 현재 칸이 이미 채워진 경우
    if (sudoku[y][x]) return fillNum(y, x + 1);

    // 1부터 9까지 넣을 수 있는 숫자 넣기
    for (let i = 1; i < 10; i++) {
      if (check(y, x, i)) {
        sudoku[y][x] = i;
        // 다 채워진 경우 true 반환
        if (fillNum(y, x + 1)) return true;
        sudoku[y][x] = 0;
      }
    }

    // 숫자를 넣을 수 없는 경우 false 반환
    return false;
  }

  // 현재 숫자를 넣을 수 있는지 확인하는 함수
  function check(y, x, num) {
    for (let i = 0; i < 9; i++) {
      // 가로줄 확인
      if (sudoku[y][i] === num) return false;
      // 세로줄 확인
      if (sudoku[i][x] === num) return false;
    }

    // 3 x 3 보드에서 확인
    const sy = Math.floor(y / 3) * 3;
    const sx = Math.floor(x / 3) * 3;
    for (let ny = sy; ny < sy + 3; ny++) {
      for (let nx = sx; nx < sx + 3; nx++) {
        if (sudoku[ny][nx] === num) return false;
      }
    }

    return true;
  }
}
