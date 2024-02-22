// 가장 긴 바이토닉 부분 수열

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

solve(input);

function solve(input) {
  const N = +input[0];
  const sequence = input[1].trim().split(' ').map(Number);
  // 0 ~ i 수열에서 sequence[i]로 끝나는 증가하는 수열 최대 길이
  const increase = Array(N).fill(1);
  // 감소하는 수열 = 뒤집은 증가하는 수열
  // i ~ N 수열에서 sequence[i]로 시작하는 감소하는 수열 최대 길이
  const decrease = Array(N).fill(1);

  for (let i = 1; i < N; i++) {
    // increase[i] 값
    let increaseMax = 1;
    // decrease[i] 값
    let decreaseMax = 1;

    // increase는 앞에서 decrease는 뒤에서
    for (let j = 0; j < i; j++) {
      // sequence[i]로 끝나는 최장 길이
      if (sequence[j] < sequence[i]) {
        increaseMax = Math.max(increaseMax, increase[j] + 1);
      }

      // sequence[N - i - 1]로 시작하는 최장 길이
      const decreaseIdx = N - j - 1;
      if (sequence[decreaseIdx] < sequence[N - i - 1]) {
        decreaseMax = Math.max(decreaseMax, decrease[decreaseIdx] + 1);
      }
    }

    increase[i] = increaseMax;
    decrease[N - i - 1] = decreaseMax;
  }

  // 0 ~ i 수열에서 만들 수 있는 증가 수열 길이와 i ~ N - 1  수열에서 만들 수 있는 감소 수열 길이
  // i가 겹치므로 - 1
  let ans = 0;
  for (let i = 0; i < N; i++) {
    ans = Math.max(ans, increase[i] + decrease[i]);
  }

  console.log(ans - 1);
}
