function solution(input) {
  const [N, M, K] = input[0].split(' ').map(Number);

  const board = input.slice(1).map((row) => row.trim());
  // 흰색으로 시작하는 보드
  const whiteStartBoard = Array.from({ length: N }, () => Array(M).fill(0));
  // 검은색으로 시작하는 보드
  const blackStartBoard = Array.from({ length: N }, () => Array(M).fill(0));

  // 각 위치의 색을 다시 칠하는 경우 1 아니면 0 저장
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if ((i + j) % 2 === 0) {
        if (board[i][j] === 'B') whiteStartBoard[i][j]++;
        else blackStartBoard[i][j]++;
        continue;
      }

      if (board[i][j] === 'B') blackStartBoard[i][j]++;
      else whiteStartBoard[i][j]++;
    }
  }

  // 누적합으로 저장
  for (let i = 1; i < M; i++) {
    whiteStartBoard[0][i] += whiteStartBoard[0][i - 1];
    blackStartBoard[0][i] += blackStartBoard[0][i - 1];
  }

  for (let i = 1; i < N; i++) {
    whiteStartBoard[i][0] += whiteStartBoard[i - 1][0];
    blackStartBoard[i][0] += blackStartBoard[i - 1][0];
  }

  for (let i = 1; i < N; i++) {
    for (let j = 1; j < M; j++) {
      whiteStartBoard[i][j] +=
        whiteStartBoard[i][j - 1] +
        whiteStartBoard[i - 1][j] -
        whiteStartBoard[i - 1][j - 1];

      blackStartBoard[i][j] +=
        blackStartBoard[i][j - 1] +
        blackStartBoard[i - 1][j] -
        blackStartBoard[i - 1][j - 1];
    }
  }

  // K * K 구간에서 다시 칠한 횟수의 최솟값 저장
  let answer = Infinity;
  for (let i = K - 1; i < N; i++) {
    for (let j = K - 1; j < M; j++) {
      let whiteSum = whiteStartBoard[i][j];
      let blackSum = blackStartBoard[i][j];

      if (i >= K) {
        whiteSum -= whiteStartBoard[i - K][j];
        blackSum -= blackStartBoard[i - K][j];
      }

      if (j >= K) {
        whiteSum -= whiteStartBoard[i][j - K];
        blackSum -= blackStartBoard[i][j - K];
      }

      if (i >= K && j >= K) {
        whiteSum += whiteStartBoard[i - K][j - K];
        blackSum += blackStartBoard[i - K][j - K];
      }

      answer = Math.min(answer, whiteSum, blackSum);
      if (answer === 0) return answer;
    }
  }

  return answer;
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');
console.log(solution(input));
