// 피보나치 수 6
// N이 매우 크므로 BigInt로 계산
let N = BigInt(
  require('fs')
    .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
    .toString()
    .trim()
);

const MOD = BigInt(1000000007);

// solve 1 - Maximum call stack 초과
// 점화식 풀어서 확인
// F(N) = F(N-1) + F(N-2) = 2F(N-2) + F(N-3)
// = 3F(N-3) + 2F(N-4) = 5F(N-4) + 3F(N-5)
// = F(K+1)*F(N-K) + F(K)*F(N-K-1)

// N이 짝수인 경우
// N = 2K => K = N / 2 => F(N/2 + 1)*F(N / 2) + F(N / 2)*F(N/2 - 1)
// = F(N/2)*(F(N/2 + 1) + F(N/2 - 1))

// N이 홀수인 경우
// N = 2K + 1 => K = (N - 1)/2 => F((N+1)/2)*F((N+1)/2) + F((N-1)/2)*F((N-1)/2)
// = F((N+1)/2)^2 + F((N-1)/2)^2
// const dp = { [BigInt(0)]: 0, [BigInt(1)]: 1 };

// function fibo(num) {
//   if (dp[num]) return dp[num];

//   let tmp = 0;
//   // num이 짝수
//   if (num % BigInt(2) === BigInt(0)) {
//     tmp =
//       fibo(num / BigInt(2)) *
//       (fibo(num / BigInt(2) + BigInt(1)) + fibo(num / BigInt(2) - BigInt(1)));
//   }
//   // num이 홀수
//   else {
//     tmp =
//       Math.pow(fibo((num + BigInt(1)) / BigInt(2)), 2) +
//       Math.pow(fibo((num - BigInt(1)) / BigInt(2)), 2);
//   }

//   dp[num] = tmp % MOD;
// }

// fibo(N);
// console.log(dp[N]);

// solve 2 - 행렬 이용
// a, b 두 개가 있는 경우 b, a+b를 만들어내면 됨
// (a, b) -> (b, a+b) => (F(0), F(1)) -> (F(1), F(2))
// a, b 변수가 두 개이므로 2 * 2 행렬을 생각
// (a, b)X = (b, a + b)
// 행렬 X = (0, 1)
//          (1, 1)
// (F(0), F(1)) * X = (F(1), F(2))
// (F(0), F(1)) * X^2 = (F(2), F(3))
// (F(0), F(1)) * X^N = (F(N), F(N+1))

let X = [
  [BigInt(0), BigInt(1)],
  [BigInt(1), BigInt(1)],
];

// 단위행렬로 초기화
let ans = [
  [BigInt(1), BigInt(0)],
  [BigInt(0), BigInt(1)],
];

// 행렬 A와 행렬 B의 곱 반환
function multiMatrix(A, B) {
  const result = [
    [BigInt(0), BigInt(0)],
    [BigInt(0), BigInt(0)],
  ];
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      let sum = BigInt(0);
      for (let k = 0; k < 2; k++) {
        sum += A[i][k] * B[k][j];
      }
      result[i][j] = sum % MOD;
    }
  }
  return result;
}

// 반복문은 재귀 과정의 반대
// N을 2로 나누면서 반복 진행
// X를 계속 제곱해서 업데이트 (X -> X^2 -> X^4 ...)
// N이 홀수인 경우에만 이전에 업데이트된 X를 곱해서 갱신
// 처음에 단위행렬로 시작

// N이 11로 시작
// N = 11 => 1 + 10 = 1 + (2 * 5)
// N = 5 => 1 + 2 * 5 = 1 + 2 * (1 + 4) = 1 + 2 + 2 * 4 = 3 + 2 * 4
// N = 2 => 3 + 2 * 2 * 2 = 3 + 4 * 2
// N = 1 => 3 + 4 * 2 * 1 => 3 + 8 = 11
while (N > BigInt(0)) {
  if (N % BigInt(2) === BigInt(1)) {
    ans = multiMatrix(ans, X);
  }

  X = multiMatrix(X, X);
  N /= BigInt(2);
}

// 한 번씩 곱하는게 아닌 짝수인 경우 N/2 * N/2로 한 번에 구하기 - Stack 초과
// function findPowerX(N) {
//   // 1인 경우 X
//   if (N === BigInt(1)) return X;

//   // 홀수인 경우 X^(N-1) * X = X^N
//   if (N % BigInt(2) !== 0) {
//     const powX = findPowerX(N - BigInt(1));
//     return multiMatrix(powX, X);
//   }

//   // 짝수인 경우 (X^(N/2) * X^(N/2) = X^N)
//   const powX = findPowerX(N / BigInt(2));
//   return multiMatrix(powX, powX);
// }

// const finalX = findPowerX(N);

console.log(parseInt(ans[1][0]));
