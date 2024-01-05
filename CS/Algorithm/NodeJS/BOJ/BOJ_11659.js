const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

// N: 숫자의 개수, M: 찾는 합의 개수
const [N, M] = input[0].split(' ').map((num) => +num);

// 입력받은 숫자들의 해당 인덱스까지의 합 O(n)
const numbers = input[1]
  .trim()
  .split(' ')
  .map((num) => +num);
for (let i = 1; i < N; i++) {
  numbers[i] += numbers[i - 1];
}

const ans = [];

// i부터 j까지 합을 저장
for (let index = 2; index < M + 2; index++) {
  const [i, j] = input[index].split(' ').map((num) => +num - 1);

  if (i === 0) {
    ans.push(numbers[j]);
    continue;
  }

  ans.push(numbers[j] - numbers[i - 1]);
}

// 저장된 합을 출력
console.log(ans.join('\n'));