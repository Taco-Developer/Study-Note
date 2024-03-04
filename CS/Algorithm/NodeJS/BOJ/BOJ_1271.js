// 엄청난 부자2

// n과 m이 Number 범위를 벗어나므로 BigInt 타입으로 저장
const [n, m] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split(' ')
  .map(BigInt);

const ans = [];
// BigInt 타입은 BigDecimal이 아니므로 나눗셈 연산의 결과 항상 나머지를 버림
ans.push(n / m);
ans.push(n - (n / m) * m);
console.log(ans.join('\n'));
