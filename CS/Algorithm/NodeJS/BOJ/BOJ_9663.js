const N = +require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString();

// const visited = Array.from({ length: N }, () => Array(N).fill(0));
// 세로
const columnCheck = Array(N).fill(0);
// 대각선
const crossCheck = [];
// \ 대각선
crossCheck.push(Array(N * 2).fill(0));
// / 대각선
crossCheck.push(Array(N * 2).fill(0));

let ans = 0;
select(0);
console.log(ans);

// solve1 - 다음에 선택불가능한 곳을 미리 저장
// function select(y) {
//   if (y === N) {
//     ans++;
//     return;
//   }

//   for (let x = 0; x < N; x++) {
//     if (visited[y][x]) continue;
//     visited[y][x] = 1;
//     checkImpossible(y, x, true);
//     select(y + 1);
//     visited[y][x] = 0;
//     checkImpossible(y, x, false);
//   }
// }

// /**
//  *
//  * @param {*} y 현재 행
//  * @param {*} x 현재 열
//  * @param {*} isImpossible 불가능 체크 여부
//  */
// function checkImpossible(y, x, isImpossible) {
//   for (let ny = y + 1; ny < N; ny++) {
//     for (let nx = 0; nx < N; nx++) {
//       // 같은 열
//       if (nx === x) {
//         isImpossible ? visited[ny][nx]++ : visited[ny][nx]--;
//         continue;
//       }
//       // 대각선
//       if (Math.abs(nx - x) === ny - y) {
//         isImpossible ? visited[ny][nx]++ : visited[ny][nx]--;
//         continue;
//       }
//     }
//   }
// }

// solve2 - 이전에 고른 것을 확인
// function select(y) {
//   // 모두 선택
//   if (y === N) {
//     ans++;
//     return;
//   }

//   // 현재 행에서 가능한 열 선택
//   for (let x = 0; x < N; x++) {
//     if (checkPossible(y, x)) {
//       // 선택 저장
//       visited[y][x] = 1;
//       select(y + 1);
//       // 선택 취소
//       visited[y][x] = 0;
//     }
//   }
// }

// // 현재 위치 가능 여부
// function checkPossible(y, x) {
//   for (let ny = 0; ny < y; ny++) {
//     // 세로 확인
//     if (visited[ny][x]) return false;

//     // 대각선 확인
//     const cross = y - ny;
//     if (x - cross >= 0 && visited[ny][x - cross]) return false;
//     if (x + cross < N && visited[ny][x + cross]) return false;
//   }

//   return true;
// }

// solve3 - 대각선을 x - y와 x + y로 비교
// 가장 빠름
function select(y) {
  if (y === N) {
    ans++;
    return;
  }

  for (let x = 0; x < N; x++) {
    // 세로, \ 대각선, / 대각선 아닌 경우
    // \ 대각선의 경우 x - y가 같으면 같은 대각선에 있는 것으로 음수가 나올 수 있는데 절댓값으로 하면 중복이 있기 때문에 + N으로 구분
    if (!columnCheck[x] && !crossCheck[0][x - y + N] && !crossCheck[1][x + y]) {
      // 세로, 대각선 체크
      columnCheck[x] = 1;
      crossCheck[0][x - y + N] = 1;
      crossCheck[1][x + y] = 1;

      select(y + 1);

      // 세로, 대각선 체크 해제
      columnCheck[x] = 0;
      crossCheck[0][x - y + N] = 0;
      crossCheck[1][x + y] = 0;
    }
  }
}
