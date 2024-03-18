// Σ

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

solve(input);

function solve(input) {
  const M = Number(input[0]);
  const mod = BigInt(1000000007);
  let ans = BigInt(0);
  input.slice(1, M + 1).forEach((dice) => {
    const [N, S] = dice.trim().split(' ').map(BigInt);
    ans += (S * power(N, mod - BigInt(2))) % mod;
  });

  console.log(Number(ans % mod));

  // 거듭제곱 결과값 반환
  function power(num, k) {
    let res = BigInt(1);
    while (k !== BigInt(0)) {
      if (k % BigInt(2) === BigInt(1)) res = (res * num) % mod;
      k /= BigInt(2);
      num = (num * num) % mod;
    }
    return res;
  }
}
