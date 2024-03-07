// 소수의 연속합

class Queue {
  items = [];
  headIdx = 0;
  tailIdx = 0;

  isEmpty() {
    return this.headIdx === this.tailIdx;
  }

  enqueue(item) {
    this.items[this.tailIdx] = item;
    this.tailIdx++;
  }

  dequeue() {
    if (this.isEmpty()) return null;

    const headItem = this.items[this.headIdx];
    this.headIdx++;

    if (this.isEmpty()) {
      this.headIdx = 0;
      this.tailIdx = 0;
    }

    return headItem;
  }
}

const N = +require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString();

// solve(N);
solve2(N);

function solve(N) {
  let ans = 0;
  let sum = 0;
  const primeNums = new Queue();

  for (let num = 2; num <= N; num++) {
    if (!isPrimeNum(num)) continue;

    // 작은 소수부터 더하기
    primeNums.enqueue(num);
    sum += num;

    // 합이 N보다 크다면 더한 순으로 다시 빼기
    while (sum > N) {
      sum -= primeNums.dequeue();
    }

    // 합이 N과 같다면 카운트
    if (sum === N) ans++;
  }

  console.log(ans);

  // 소수 확인
  function isPrimeNum(num) {
    for (let i = 2; i <= Math.floor(Math.sqrt(num)); i++) {
      if (num % i === 0) return false;
    }
    return true;
  }
}

function solve2(N) {
  // Prime Number 확인
  // 2인 경우 4부터 2로 나눠지는 모든 수 소수 아님
  // 3인 경우 9부터 3으로 나눠지는 모든 수 소수 아님
  // 4는 2에서 체크했으므로 패스
  // 5인 경우 25부터 5로 나눠지는 모든 수 소수 아님
  // j에서 N까지 확인하므로 i는 i*i가 N이하인 경우만 확인
  const isPrimeNum = Array(N + 1).fill(true);
  for (let i = 2; i * i <= N; i++) {
    if (!isPrimeNum[i]) continue;
    for (let j = i * i; j <= N; j += i) {
      isPrimeNum[j] = false;
    }
  }

  // 2부터 N까지 모든 소수 저장
  const primeNums = [];
  for (let i = 2; i <= N; i++) {
    if (isPrimeNum[i]) primeNums.push(i);
  }

  const queue = new Queue();
  let sum = 0;
  let ans = 0;

  for (let i = 0; i < primeNums.length; i++) {
    // 소수를 작은 순으로 더하기
    sum += primeNums[i];
    queue.enqueue(primeNums[i]);

    // 합이 N보다 크다면 들어온 순서로 다시 빼기
    while (sum > N) {
      sum -= queue.dequeue();
    }

    // 합이 N과 같다면 카운트
    if (sum === N) ans++;
  }

  console.log(ans);
}
