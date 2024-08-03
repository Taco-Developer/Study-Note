function solution(input) {
  const [N, H, W] = input[0].split(' ').map(Number);

  const answer = Array(N).fill('?');

  // i: 원래 문자열 인덱스
  for (let i = 0; i < N; i++) {
    let isPossible = false; // 원래 문자열을 찾았는지 여부
    for (let j = 0; j < W; j++) {
      const w = i * W + j; // 번진 문자열의 가로 인덱스

      // k: 번진 문자열의 세로 인덱스
      for (let k = 1; k <= H; k++) {
        if (input[k][w] === '?') continue;

        isPossible = true;
        answer[i] = input[k][w];
        break;
      }

      if (isPossible) break;
    }
  }

  console.log(answer.join(''));
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');
solution(input);
