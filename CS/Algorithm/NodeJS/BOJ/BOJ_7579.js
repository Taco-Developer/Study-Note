// 앱

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

solve();

function solve() {
  const [N, M] = input[0].split(' ').map(Number);

  // 각 앱의 메모리와 비용
  const memories = [0].concat(input[1].trim().split(' ').map(Number));
  const costs = [0].concat(input[2].trim().split(' ').map(Number));

  // 가능한 최대 비용
  const MAX_COST = 10001;

  // dp[cost][i] = i번 앱까지 있을 때 cost로 얻을 수 있는 최대 메모리
  const dp = [];
  for (let i = 0; i < MAX_COST; i++) {
    dp.push(Array(N + 1).fill(0));
  }

  for (let cost = 0; cost < MAX_COST; cost++) {
    for (let app = 1; app < N + 1; app++) {
      const nowCost = costs[app];

      // 현재 앱을 비활성화 못하는 경우 이전 앱까지 최댓값 저장
      if (nowCost > cost) {
        dp[cost][app] = dp[cost][app - 1];
        continue;
      }

      const nowMemory = memories[app];

      // 현재 앱 비활성화를 하지 않는 경우와 비활성화를 하는 경우 비교해서 최댓값 저장
      dp[cost][app] = Math.max(
        dp[cost][app - 1],
        nowMemory + dp[cost - nowCost][app - 1]
      );

      // 목표 메모리 확보가 가능한 경우 현재 cost 출력 후 종료
      if (dp[cost][app] >= M) {
        console.log(cost);
        return;
      }
    }
  }

  // const dp = [];
  // for (let i = 0; i < N + 1; i++) {
  //   dp.push(Array(MAX_COST).fill(0));
  // }

  // for (let cost = 0; cost < MAX_COST; cost++) {
  //   for (let app = 1; app < N + 1; app++) {
  //     const nowAppCost = costs[app];

  //     // 현재 앱을 비활성화 못하는 경우 이전 앱까지 최댓값 저장
  //     if (nowAppCost > cost) {
  //       dp[app][cost] = dp[app - 1][cost];
  //       continue;
  //     }

  //     // 현재 앱 비활성화를 하지 않는 경우와 비활성화를 하는 경우 비교해서 최댓값 저장
  //     const nowMemory = memories[app];
  //     dp[app][cost] = Math.max(
  //       dp[app - 1][cost],
  //       dp[app - 1][cost - nowAppCost] + nowMemory
  //     );

  //     // 목표 메모리 확보가 가능한 경우 현재 cost 출력 후 종료
  //     if (dp[app][cost] >= M) {
  //       console.log(cost);
  //       return;
  //     }
  //   }
  // }
}
