// 숨바꼭질 2
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

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

solve(input);

function solve(input) {
  // N: 수빈 위치, K: 동생 위치
  const [N, K] = input;

  const ans = getMinTime();
  console.log(ans.join('\n'));

  // 최소 시간과 방법 개수 반환 함수
  function getMinTime() {
    // 시간 배열 길이
    const timesLength = N > K ? 2 * N + 1 : 2 * K + 1;
    const times = Array(timesLength).fill(Infinity);

    // 시간이 무조건 1초씩 증가하므로 Queue 활용
    const queue = new Queue();
    // 시작 위치에서 출발
    queue.enqueue([N, 0]);
    times[N] = 0;
    // 최소 시간에 목표 도달 횟수
    let cnt = 0;

    while (!queue.isEmpty()) {
      const [now, time] = queue.dequeue();

      // 최소 시간 보다 커진 경우 저장된 값 반환
      if (time > times[K]) return [times[K], cnt];

      // 최소 시간에 목표 도달
      if (now === K) {
        cnt++;
        continue;
      }

      move(now, time, times, queue);
    }

    return [times[K], cnt];
  }

  // 위치 변경 함수
  function move(now, time, times, queue) {
    const nextTime = time + 1;

    // 다음 위치
    const nextPostions = [];
    // 왼쪽 걷기
    if (now > 0) nextPostions.push(now - 1);
    // 오른쪽 걷기
    if (now < K) nextPostions.push(now + 1);
    // 순간 이동
    if (now > 0 && now < K) nextPostions.push(now * 2);

    nextPostions.forEach((next) => {
      // 저장된 시간보다 빠르거나 같은 경우 이동
      if (times[next] >= nextTime) {
        times[next] = nextTime;
        queue.enqueue([next, nextTime]);
      }
    });
  }
}
