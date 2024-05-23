// 골드바흐 파티션

function solution(nums) {
  // 1 ~ 1000000 소수 저장
  const isPrime = [false, false];
  const MAX = 1000000;
  for (let i = 2; i <= MAX; i++) {
    if (isPrime[i] === false) continue;
    isPrime[i] = true;
    for (let j = i * i; j <= MAX; j += i) isPrime[j] = false;
  }

  let answer = '';
  nums.forEach((num) => {
    let cnt = 0;
    // 2 ~ num / 2 범위에서 찾은 수가 소수이고 (num - 찾은 수)가 소수인지 확인
    for (let i = 2; i <= num / 2; i++) {
      if (isPrime[i] && isPrime[num - i]) cnt++;
    }

    answer += `${cnt}\n`;
  });

  return answer.trimEnd();
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number)
  .slice(1);
console.log(solution(input));
