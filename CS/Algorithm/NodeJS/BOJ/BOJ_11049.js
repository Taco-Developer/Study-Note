// 행렬의 곱셈 순서

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

solve2(input);

// function solve(input) {
//   const N = Number(input[0]);
//   const matirix = input.slice(1, N + 1).map((data) => {
//     const [r, c] = data.trim().split(' ').map(Number);
//     return [r, c, false];
//   });

//   let min = Infinity;

//   for (let i = 0; i < N; i++) {
//     matirix[i][2] = true;
//     select(matirix[i][0], matirix[i][1], 0, 1);
//     matirix[i][2] = false;
//   }

//   console.log(min);

//   function select(r, c, sum, cnt) {
//     if (sum >= min) return;

//     if (cnt === N) {
//       min = Math.min(min, sum);
//       return;
//     }

//     for (let i = 0; i < N; i++) {
//       if (matirix[i][2]) continue;

//       const [nr, nc] = matirix[i];
//       if (c === nr) {
//         matirix[i][2] = true;
//         select(r, nc, sum + r * nr * nc, cnt + 1);
//         matirix[i][2] = false;
//         continue;
//       }

//       if (r === nc) {
//         matirix[i][2] = true;
//         select(nr, c, sum + nr * r * c, cnt + 1);
//         matirix[i][2] = false;
//         continue;
//       }
//     }

//     for (let i = 0; i < N; i++) {
//       if (matirix[i][2]) continue;
//     }
//   }
// }

function solve2(input) {
  const N = Number(input[0]);
  const matirix = input.slice(1, N + 1).map((data) => {
    const [r, c] = data.trim().split(' ').map(Number);
    return [r, c];
  });

  // dp[i][j] => i === j인 경우 행렬이 1개만 있는 경우 곱을 할 수 없으므로 0으로 초기화
  // dp[i][j] => i < j인 경우 i행렬부터 j행렬까지 곱을 했을 때 최소 연산 횟수 저장
  const dp = Array.from({ length: N }, () => Array(N).fill(0));

  // length = 곱셈 길이
  // 2 => AB, BC, CD, EF...
  // 3 => ABC, BCD, CDF...
  for (let length = 2; length < N + 1; length++) {
    // 곱셈 시작 위치
    for (let start = 0; start < N - length + 1; start++) {
      // 마지막 위치
      const end = start + length - 1;
      // 연산 전 최댓값으로 초기화
      dp[start][end] = Infinity;
      // 곱의 왼쪽과 오른쪽을 구분
      for (let mid = start; mid < end; mid++) {
        // A(BC)와 (AB)C 중 최솟값을 저장
        dp[start][end] = Math.min(
          // 저장된 값
          dp[start][end],
          // 현재 값
          // start부터 mid까지 연산 횟수 +
          // mid+1부터 end까지 연산 횟수 +
          // (start~mid)행렬과 (mid+1~end) 행렬 곱 연산 횟수
          dp[start][mid] +
            dp[mid + 1][end] +
            matirix[start][0] * matirix[mid + 1][0] * matirix[end][1]
        );
      }
    }
  }

  console.log(dp[0][N - 1]);
}
