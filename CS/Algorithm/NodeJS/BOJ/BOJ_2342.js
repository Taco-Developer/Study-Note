// Dance Dance Revolution

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

solve();

function solve() {
  // n: 입력된 수열 길이
  const n = input.length;

  if (n === 1) {
    console.log(0);
    return;
  }

  // power[start][target] => start 위치에서 target으로 가는 경우 필요한 힘
  const power = Array.from({ length: 5 }, (_, i) =>
    Array.from({ length: 5 }, (_, j) => {
      if (i === j) return 1;
      if (i === 0) return 2;
      if ((i + j) & 1) return 3;
      return 4;
    })
  );

  // dp[i][l][r] => i번 이동 후 왼발이 l에 위치하고, 오른발이 r에 위치했을 때 최소로 드는 힘을 저장
  const dp = [];
  for (let i = 0; i < n; i++) {
    dp.push(Array.from({ length: 5 }, () => Array(5).fill(Infinity)));
  }
  dp[0][0][0] = 0;

  for (let i = 0; i < n - 1; i++) {
    const target = input[i];

    for (let l = 0; l < 5; l++) {
      for (let r = 0; r < 5; r++) {
        if (dp[i][l][r] === Infinity) continue; // 이전에 해당 위치로 도착하지 않음

        // 왼발을 목표 위치로 이동
        if (target !== r)
          dp[i + 1][target][r] = Math.min(
            dp[i + 1][target][r],
            dp[i][l][r] + power[l][target]
          );

        // 오른발을 목표 위치로 이동
        if (target !== l)
          dp[i + 1][l][target] = Math.min(
            dp[i + 1][l][target],
            dp[i][l][r] + power[r][target]
          );
      }
    }
  }

  let answer = Infinity;
  const i = n - 1;
  for (let l = 0; l < 5; l++) {
    for (let r = 0; r < 5; r++) {
      answer = Math.min(answer, dp[i][l][r]);
    }
  }
  console.log(answer);
}
