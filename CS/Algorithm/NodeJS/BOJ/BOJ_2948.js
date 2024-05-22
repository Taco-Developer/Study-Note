function solution(nums) {
  // MAX까지 모든 소수 찾기
  const isPrime = [false, false];
  const MAX = 123456 * 2;
  for (let i = 2; i <= MAX; i++) {
    if (isPrime[i] !== false) isPrime[i] = true;
    for (let j = i * i; j <= MAX; j += i) isPrime[j] = false;
  }

  // (n + 1) ~ (n * 2) 소수 개수 저장
  const answer = nums.reduce((acc, num) => {
    let cnt = 0;
    for (let i = num + 1; i <= num * 2; i++) {
      if (isPrime[i]) cnt++;
    }
    acc += `${cnt}\n`;
    return acc;
  }, '');

  return answer.trimEnd();
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number);
console.log(solution(input.slice(0, input.length - 1)));
