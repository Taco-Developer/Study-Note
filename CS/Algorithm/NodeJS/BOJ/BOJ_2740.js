function solution(input) {
  const multiply = (A, B, N, M, K) => {
    const result = [];
    for (let i = 0; i < N; i++) result.push(Array(K).fill(0));

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < K; j++) {
        for (let k = 0; k < M; k++) {
          result[i][j] += A[i][k] * B[k][j];
        }
      }
    }

    return result.map((row) => row.join(' ')).join('\n');
  };

  const [N, M] = input[0];
  const [_, K] = input[N + 1];

  const A = [];
  const B = [];
  for (let i = 1; i <= N; i++) A.push(input[i]);

  for (let i = N + 2; i < N + M + 2; i++) B.push(input[i]);

  return multiply(A, B, N, M, K);
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((row) => row.trim().split(' ').map(Number));
console.log(solution(input));
