// BOJ_1018 체스판 다시 칠하기
// https://www.acmicpc.net/problem/1018
// 시간 제한 2초, 메모리 제한 128MB
// 완전 탐색으로 접근해도 50 * 50의 2차원 배열이기 때문에 제한 시간 안에 가능

// 방법 1
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : './input.txt')
  .toString()
  .trim()
  .split('\n');

const [N, M] = input[0].trim().split(' ');

let ans = 8 * 8;

// 8*8 체스판으로 나누기
for (let startRow = 0; startRow < N - 7; startRow++) {
  for (let startCol = 0; startCol < M - 7; startCol++) {
    let blackStartChangeCnt = 0;
    let whiteStartChangeCnt = 0;
    // 검은색 시작 체스판 - row, col 합이 홀수이면 흰 색, 흰색 시작 체스판 - row, col 합이 홀수이면 검은 색
    for (let row = startRow; row < startRow + 8; row++) {
      const line = input[row + 1].trim();
      for (let col = startCol; col < startCol + 8; col++) {
        if ((row + col) % 2 === 0) {
          line[col] !== 'B'
            ? (blackStartChangeCnt += 1)
            : (whiteStartChangeCnt += 1);
          continue;
        }
        line[col] !== 'B'
          ? (whiteStartChangeCnt += 1)
          : (blackStartChangeCnt += 1);
      }
    }
    const result =
      blackStartChangeCnt > whiteStartChangeCnt
        ? whiteStartChangeCnt
        : blackStartChangeCnt;
    ans = result > ans ? ans : result;
  }
}

console.log(ans);

// 방법 2
// 입력
// const input = require('fs')
//   .readFileSync(process.platform === 'linux' ? '/dev/stdin' : './input.txt')
//   .toString()
//   .trim()
//   .split('\n');

// function solution(input) {
//   // M: 세로 길이, 가로 길이
//   const [M, N] = input[0]
//     .trim()
//     .split(' ')
//     .map((num) => +num);

//   // 제대로 칠해진 경우
//   const possibleCase = ['BWBWBWBW', 'WBWBWBWB'];

//   // 정답
//   const ans = [];

//   // 체스판 왼쪽 모서리 모음
//   const startPoints = [];
//   for (let y = 0; y <= M - 8; y++) {
//     for (let x = 0; x <= N - 8; x++) {
//       startPoints.push([y, x]);
//     }
//   }

//   // 모든 가능한 왼쪽 모서리부터 확인
//   for (const [sy, sx] of startPoints) {
//     // 검은색 시작, 흰색 시작 구분
//     // i가 0인 경우 검은색 시작이고 i가 1인 경우 흰색 시작에 해당
//     // 2로 나눈 나머지가 0과 1로 반복되기 때문임
//     for (let i = 0; i < 2; i++) {
//       let changedCnt = 0;

//       // 왼쪽 모서리에서 시작해서 8 * 8 구역 확인
//       for (let y = 0; y < 8; y++) {
//         // 현재 행의 데이터
//         const now = input[sy + y + 1].trim();
//         for (let x = 0; x < 8; x++) {
//           // 확인하려는 열 위치에 해당하는 값을 비교해서 다르면 카운트
//           changedCnt += now[sx + x] === possibleCase[(i + y) % 2][x] ? 0 : 1;
//         }
//       }
//       ans.push(changedCnt);
//     }
//   }

//   console.log(Math.min(...ans));
// }

// solution(input);
