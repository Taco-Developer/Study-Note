// 빙고
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((row) => row.trim().split(' ').map(Number));

solve(input);

function solve(input) {
  // 게임 보드
  const board = input.slice(0, 5);
  // 호출 번호
  const callNumbers = input.slice(5, 11);

  let ans = 0;
  // 빙고 카운트
  let bingoCnt = 0;

  let i = 0;
  let j = 0;

  while (bingoCnt < 3) {
    if (j === 5) {
      i++;
      j = 0;
      continue;
    }
    deletedNumber(callNumbers[i][j]);
    j++;
  }

  console.log(ans);

  // 호출된 번호 지우기
  function deletedNumber(number) {
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        if (board[y][x] === number) {
          board[y][x] = 0;
          ans++;
          checkBingo(y, x);
        }
      }
    }
  }

  // 빙고 확인
  function checkBingo(y, x) {
    let deletedRowCnt = 0;
    let deletedColCnt = 0;
    let deletedDownCrossCnt = 0;
    let deletedUpCrossCnt = 0;

    // 가로, 세로 빙고 확인
    for (let i = 0; i < 5; i++) {
      if (board[y][i] === 0) deletedRowCnt++;
      if (board[i][x] === 0) deletedColCnt++;
    }

    // 가로 빙고
    if (deletedRowCnt === 5) bingoCnt++;
    // 세로 빙고
    if (deletedColCnt === 5) bingoCnt++;

    // DownBingo 확인
    if (y === x) {
      for (let i = 0; i < 5; i++) {
        if (board[i][i] !== 0) break;
        deletedDownCrossCnt++;
      }
      if (deletedDownCrossCnt === 5) bingoCnt++;
    }

    // UpBingo 확인
    if (y + x === 4) {
      for (let i = 0; i < 5; i++) {
        if (board[4 - i][i] !== 0) break;
        deletedUpCrossCnt++;
      }
      if (deletedUpCrossCnt === 5) bingoCnt++;
    }
  }
}
