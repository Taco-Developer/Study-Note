function solution(input) {
  const testCase = +input[0];
  let inputIdx = 1;

  const answer = [];

  for (let caseNum = 1; caseNum <= testCase; caseNum++) {
    const board = input
      .slice(inputIdx, inputIdx + 3)
      .map((row) => row.trim().split(''));
    const namgue = input[inputIdx + 3].trim();
    inputIdx += 4;

    // 가로나 세로에서 위치를 찾았는지 여부
    let isChanged = false;

    // 가로, 세로 확인
    for (let i = 0; i < 3; i++) {
      let rowCnt = 0;
      let colCnt = 0;
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === namgue) rowCnt++;
        if (board[j][i] === namgue) colCnt++;
      }

      if (rowCnt === 2) {
        board[i][0] = board[i][1] = board[i][2] = namgue;
        isChanged = true;
        break;
      } else if (colCnt === 2) {
        board[0][i] = board[1][i] = board[2][i] = namgue;
        isChanged = true;
        break;
      }
    }

    // 대각선 확인
    if (!isChanged) {
      let cnt = 0;
      for (let i = 0; i < 3; i++) {
        if (board[i][i] === namgue) cnt++;
      }

      if (cnt === 2) board[0][0] = board[1][1] = board[2][2] = namgue;
      else board[0][2] = board[1][1] = board[2][0] = namgue;
    }

    answer.push(
      `Case ${caseNum}:`,
      board.map((row) => row.join('')).join('\n')
    );
  }

  console.log(answer.join('\n'));
}

const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
