function solution(input) {
  const [n, k] = input[0].split(' ').map(Number);

  // 경험치를 오름차순으로 정렬
  const exp = input[1]
    .split(' ')
    .map(Number)
    .sort((a, b) => a - b);

  let answer = 0n;

  // 경험치 작은 순으로 k개 진행 (진행하며 하나씩 활성화), 활성화 개수만큼 경험치를 곱해서 받음
  for (let i = 1; i < k; i++) {
    answer += BigInt(exp[i]) * BigInt(i);
  }

  // k개 활성화되어 있으므로 획득하는 경험치는 exp[i] * k임
  for (let i = k; i < n; i++) {
    answer += BigInt(exp[i]) * BigInt(k);
  }

  console.log(answer.toString());
}
const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
