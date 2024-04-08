// 1의 개수 세기

const [A, B] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .split(' ')
  .map(BigInt);

const binaryB = B.toString(2);

// dp[i] = 0부터 2^(i+1) - 1까지 1의 개수
const dp = [];
dp[0] = BigInt(1);
for (let i = 1; i < binaryB.length - 1; i++) {
  dp[i] = dp[i - 1] * BigInt(2) + BigInt(2) ** BigInt(i);
}

console.log(
  (
    getOneCnt(B, binaryB) -
    getOneCnt(A - BigInt(1), (A - BigInt(1)).toString(2))
  ).toString()
);

// 12 => 1100
// 000 ~ 111 개수 더하기 (dp[2] => 12)
// 1000 ~ 1100에서 가장 앞 1의 개수 더하기 (1100 => 12, 1000 => 8, 12 - 8 + 1 = 5)
// 00 ~ 11 개수 더하기 (dp[1] => 4)
// 100 가장 앞 1의 개수 더하기 (1)
// 22
function getOneCnt(num, binaryNum) {
  const biLength = binaryNum.length;
  let cnt = binaryNum[biLength - 1] === '1' ? BigInt(1) : BigInt(0);

  for (let i = 0; i < biLength - 1; i++) {
    if (binaryNum[i] === '0') continue;
    // 현재 비트 번호
    const bitNum = biLength - 1 - i;
    // 0부터 2^현재 비트 - 1까지 1의 개수 누적합
    cnt += dp[bitNum - 1];
    // 현재 비트 지우기
    num -= BigInt(2) ** BigInt(bitNum);
    // 남은 수 + 1 = 현재 비트 위치에 있던 1의 개수 합
    cnt += num + BigInt(1);
  }

  return cnt;
}
