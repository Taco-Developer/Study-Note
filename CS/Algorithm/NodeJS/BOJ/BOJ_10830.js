// 행렬 제곱

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

solve(input);

function solve(input) {
  // N: 행렬의 크기, B: 제곱 횟수
  const [N, B] = input[0].split(' ').map(Number);

  // 입력받은 행렬
  const matrix = input.slice(1, N + 1).map((row) =>
    row
      .trim()
      .split(' ')
      .map((num) => +num % 1000)
  );

  const ans = powMatrix(B);

  ans.forEach((row) => {
    console.log(row.join(' '));
  });

  // 행렬을 num만큼 곱한 행렬을 찾는 함수
  function powMatrix(num) {
    // ^1은 matrix 그대로
    if (num === 1) return matrix;

    // num이 홀수인 경우 ^(1 + num - 1)
    if (num % 2) return multipleMatrix(matrix, powMatrix(num - 1));

    // num이 짝수인 경우 ^(num/2 + num/2)
    const temp = powMatrix(num / 2);
    return multipleMatrix(temp, temp);
  }

  // 행렬 2개를 곱하는 함수
  function multipleMatrix(matrixA, matrixB) {
    const temp = Array.from({ length: N }, () => Array(N).fill(0));
    // i: 왼쪽 행렬의 가로줄
    for (let i = 0; i < N; i++) {
      // j: 오른쪽 행렬의 세로줄
      for (let j = 0; j < N; j++) {
        // k: 왼쪽 행렬 가로줄에서 위치인 동시에 오른쪽 행렬 세로줄에서 위치
        for (let k = 0; k < N; k++) {
          temp[i][j] += matrixA[i][k] * matrixB[k][j];
        }
        // 1000으로 나눈 나머지 저장
        temp[i][j] %= 1000;
      }
    }
    return temp;
  }
}
