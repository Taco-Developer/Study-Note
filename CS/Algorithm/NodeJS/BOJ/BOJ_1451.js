function solution(input) {
  // N: 세로 길이, M: 가로 길이
  const [N, M] = input[0].split(' ').map(Number);

  const rectangles = [];
  rectangles.push(Array(M + 1).fill(0));
  for (let i = 1; i <= N; i++) {
    rectangles.push([0].concat(input[i].trim().split('').map(Number)));
  }

  // 합 계산 편의를 위해 누적합 저장
  for (let y = 1; y <= N; y++) {
    for (let x = 1; x <= M; x++) {
      rectangles[y][x] +=
        rectangles[y][x - 1] + rectangles[y - 1][x] - rectangles[y - 1][x - 1];
    }
  }

  // (sy, sx) ~ (ey, ex) 범위의 사각형 합 반환
  const getSum = (sy, sx, ey, ex) => {
    return (
      rectangles[ey][ex] -
      rectangles[ey][sx - 1] -
      rectangles[sy - 1][ex] +
      rectangles[sy - 1][sx - 1]
    );
  };

  // 사각형 3개를 고르고 그 합을 곱했을 때 최댓값 반환
  // ㅣ, ㅡ, ㅜ, ㅗ, ㅓ, ㅏ 총 6가지 경우가 있음
  const getMax = (N, M) => {
    let max = 0;

    // ㅣ 모양 3개 확인
    for (let i = 1; i < M - 1; i++) {
      for (let j = i + 1; j < M; j++) {
        const sum =
          getSum(1, 1, N, i) * getSum(1, i + 1, N, j) * getSum(1, j + 1, N, M);
        if (max < sum) max = sum;
      }
    }

    // ㅡ 모양 3개 확인
    for (let i = 1; i < N - 1; i++) {
      for (let j = i + 1; j < N; j++) {
        const sum =
          getSum(1, 1, i, M) * getSum(i + 1, 1, j, M) * getSum(j + 1, 1, N, M);
        if (max < sum) max = sum;
      }
    }

    // ㅜ, ㅗ, ㅓ, ㅏ 모양 확인
    for (let i = 1; i < N; i++) {
      for (let j = 1; j < M; j++) {
        // ㅜ 모양
        const top =
          getSum(1, 1, i, M) *
          getSum(i + 1, 1, N, j) *
          getSum(i + 1, j + 1, N, M);

        // ㅗ 모양
        const bottom =
          getSum(1, 1, i, j) * getSum(1, j + 1, i, M) * getSum(i + 1, 1, N, M);

        // ㅓ 모양
        const right =
          getSum(1, 1, i, j) * getSum(i + 1, 1, N, j) * getSum(1, j + 1, N, M);

        // ㅏ 모양
        const left =
          getSum(1, 1, N, j) *
          getSum(1, j + 1, i, M) *
          getSum(i + 1, j + 1, N, M);

        const bigCase = Math.max(top, bottom, right, left);
        if (max < bigCase) max = bigCase;
      }
    }

    return max;
  };

  return getMax(N, M);
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');
console.log(solution(input));
