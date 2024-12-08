function solution(input) {
  const P = +input[0];

  // isPrime[num] => num이 소수 여부 반환
  const isPrime = Array.from({ length: 10001 }, () => true);
  isPrime[1] = false; // 문제에서 1은 소수가 아니라고 판단하기로 함
  for (let num = 2; num <= 10000; num++) {
    if (!isPrime[num]) continue;
    for (let next = num * num; next <= 10000; next += num)
      isPrime[next] = false;
  }

  // isHappy[num] => num이 행복한 수 여부 반환
  const isHappy = [false, true];
  for (let num = 2; num <= 10000; num++) {
    if (isHappy[num] !== undefined) continue;

    // 행복한 수 여부
    let result = false;
    // 확인한 숫자 집합
    const visited = new Set();
    // 현재 숫자
    let now = num;

    // visited에 저장된 숫자가 다시 나오면 종료(행복한 수가 아님)
    while (!visited.has(now)) {
      visited.add(now);

      // 다음 수
      const next = now
        .toString()
        .split('')
        .reduce((sum, positionNum) => sum + +positionNum * +positionNum, 0);

      // next가 이미 행복한 수인지 확인된 숫자인 경우 해당 결과를 저장 후 종료
      if (isHappy[next] !== undefined) {
        result = isHappy[next];
        break;
      }

      // 현재 수 업데이트
      now = next;
    }

    // 확인된 결과를 visited에 저장된 모든 숫자에 저장
    visited.forEach((visitedNum) => {
      isHappy[visitedNum] = result;
    });
  }

  const answer = [];

  for (let p = 1; p <= P; p++) {
    const [caseNum, M] = input[p].split(' ').map(Number);

    if (!isPrime[M] || !isHappy[M]) {
      answer.push(`${caseNum} ${M} NO`);
      continue;
    }

    answer.push(`${caseNum} ${M} YES`);
  }

  console.log(answer.join('\n'));
}
const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
