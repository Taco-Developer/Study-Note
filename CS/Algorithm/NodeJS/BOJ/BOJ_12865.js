const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

// N: 물건의 개수, K: 버틸 수 있는 무게
const [N, K] = input[0].trim().split(' ').map(Number);

// solve1 - 아이템 개수만큼 행 만들기
// // 행: 아이템, 열: 무게
// const dp = Array.from({ length: N + 1 }, () => Array(K + 1).fill(0));

// // 아이템을 선택
// for (let i = 1; i <= N; i++) {
//   // M: 무게, V: 가치
//   const [W, V] = input[i].trim().split(' ').map(Number);

//   // 가방 최대 무게 선택
//   for (let w = 1; w <= K; w++) {
//     // 현재 무게에서 담을 수 없는 물건이라면 이전 아이템의 현재 무게에서 저장된 가치 가져오기
//     if (w < W) {
//       dp[i][w] = dp[i - 1][w];
//       continue;
//     }

//     // 물건을 담지 않는 경우와 담는 경우를 비교해서 최댓값 저장
//     // 물건을 담는 경우 이전 아이템 선택할 때 현재 아이템의 무게만큼 비워둔 경우의 가치 + 현재 아이템 가치
//     dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - W] + V);
//   }
// }

// solve2 - 행을 하나만 만들기
// 해당 무게에서 최대 가치를 저장
const dp = Array(K + 1).fill(0);

for (let i = 1; i <= N; i++) {
  // 아이템 선택
  const [W, V] = input[i].trim().split(' ').map(Number);

  // 최대 무게에서 현재 아이템 무게까지 반복
  // 주의!! 현재 아이템 무게에서 최대 무게로 하면 K - W가 W보다 큰 경우 중복으로 선택됨
  for (let w = K; w >= W; w--) {
    // 현재 아이템을 넣지 않고 지금까지 쌓인 가치와 현재 아이템만큼 무게를 비웠을 때 쌓인 가치 + 현재 아이템 가치를 비교해서
    // 최댓값을 저장
    dp[w] = Math.max(dp[w], dp[w - W] + V);
  }
}

console.log(dp[K]);
