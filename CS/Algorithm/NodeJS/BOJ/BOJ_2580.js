function solution(input) {
  // isRowPossible[r][num] => r행에 num이 들어갈 수 있는지
  const isRowPossible = Array.from({ length: 9 }, () => Array(10).fill(true));
  // isColPossible[c][num] => c열에 num이 들어갈 수 있는지
  const isColPossible = Array.from({ length: 9 }, () => Array(10).fill(true));
  // 00 ~ 22까지 9구역으로 나눠서 해당 구역에 num이 들어갈 수 있는지
  const isSectionPossible = {};
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      isSectionPossible[`${r}${c}`] = Array(10).fill(true);
    }
  }

  // 숫자를 넣는 함수
  const insertNum = (emptyPositions, now) => {
    // 끝까지 다 넣은 경우 종료
    if (now === emptyPositions.length) {
      console.log(input.map((row) => row.join(' ')).join('\n'));
      process.exit();
    }

    // 숫자를 넣어야하는 현재 행과 열
    const [nr, nc] = emptyPositions[now];
    // 현재 행과 열이 위치한 구역
    const startR = Math.floor(nr / 3);
    const startC = Math.floor(nc / 3);

    // 1부터 9까지 가능한 수를 삽입
    for (let num = 1; num < 10; num++) {
      if (
        isRowPossible[nr][num] &&
        isColPossible[nc][num] &&
        isSectionPossible[`${startR}${startC}`][num]
      ) {
        input[nr][nc] = num;
        isRowPossible[nr][num] = false;
        isColPossible[nc][num] = false;
        isSectionPossible[`${startR}${startC}`][num] = false;

        insertNum(emptyPositions, now + 1);

        // 삽입한 수 초기화
        input[nr][nc] = 0;
        isRowPossible[nr][num] = true;
        isColPossible[nc][num] = true;
        isSectionPossible[`${startR}${startC}`][num] = true;
      }
    }
  };

  const emptyPositions = [];

  input.forEach((row, rowIdx) => {
    row.forEach((num, colIdx) => {
      if (num === 0) {
        emptyPositions.push([rowIdx, colIdx]);
        return;
      }

      // 현재 숫자가 포함된 행, 열, 구역 가능한 수 업데이트
      isRowPossible[rowIdx][num] = false;
      isColPossible[colIdx][num] = false;
      isSectionPossible[`${Math.floor(rowIdx / 3)}${Math.floor(colIdx / 3)}`][
        num
      ] = false;
    });
  });

  insertNum(emptyPositions, 0);
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((row) => row.trim().split(' ').map(Number));
solution(input);
