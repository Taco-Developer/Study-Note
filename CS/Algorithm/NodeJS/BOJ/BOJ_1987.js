const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

main(input);

function main(input) {
  const [R, C] = input[0].split(' ').map(Number);
  const alphabet = {};

  const board = input.slice(1, R + 1).map((row) =>
    row
      .trim()
      .split('')
      .map((char) => {
        const num = char.charCodeAt(0) - 65;
        alphabet[num] = 1;
        return num;
      })
  );

  // 최대 이동 거리
  const maxCnt = Object.keys(alphabet).length;
  // 시작 위치 체크
  alphabet[board[0][0]] = 0;
  // 이동 거리 최댓값 저장
  let ans = 1;

  // 상하좌우
  const dir = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  getMax(0, 0, 1);

  console.log(ans);

  // 최대 이동 거리 구하는 함수
  function getMax(r, c, cnt) {
    // 최댓값이면 종료
    if (ans === maxCnt) return;

    // 최댓값 저장
    ans = Math.max(ans, cnt);

    for (let i = 0; i < 4; i++) {
      const nr = r + dir[i][0];
      const nc = c + dir[i][1];

      // 범위를 벗어나거나 이미 확인한 알파벳인 경우 패스
      if (nr < 0 || nr >= R || nc < 0 || nc >= C || !alphabet[board[nr][nc]])
        continue;

      // 알파벳 체크
      alphabet[board[nr][nc]] = 0;
      getMax(nr, nc, cnt + 1);
      // 알파벳 체크 해제
      alphabet[board[nr][nc]] = 1;
    }
  }
}
