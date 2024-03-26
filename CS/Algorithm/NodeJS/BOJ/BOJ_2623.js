// 음악프로그램
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
    const item = this.items[this.headIdx];
    this.headIdx++;

    if (this.isEmpty()) {
      this.headIdx = 0;
      this.tailIdx = 0;
    }

    return item;
  }
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

solve();

function solve() {
  // N: 가수 수, M: 보조PD 수
  const [N, M] = input[0].split(' ').map(Number);
  // graph[i] => i보다 뒤에 있는 가수 배열
  const graph = [];
  for (let i = 0; i < N + 1; i++) {
    graph.push([]);
  }
  // prevCnt[i] => i보다 앞에 있는 가수 수
  const prevCnt = Array(N + 1).fill(0);

  // graph, prevCnt 정보 입력
  input.slice(1, M + 1).forEach((data) => {
    const [_, ...singers] = data.split(' ').map(Number);
    for (let i = 0; i < singers.length - 1; i++) {
      const from = singers[i];
      const to = singers[i + 1];
      graph[from].push(to);
      prevCnt[to]++;
    }
  });

  const answer = [];
  // 확정된 가수 수
  let visited = 0;
  // 순서를 확정할 수 있는 가수들이 있는 queue
  const queue = new Queue();
  for (let i = 1; i <= N; i++) {
    if (prevCnt[i]) continue;
    visited++;
    queue.enqueue(i);
  }

  while (!queue.isEmpty()) {
    // 현재 순서가 확정되는 가수
    const now = queue.dequeue();
    answer.push(now);

    // 현재 가수 다음으로 오는 가수 확인
    graph[now].forEach((next) => {
      prevCnt[next]--;
      if (prevCnt[next] === 0) {
        queue.enqueue(next);
        visited++;
      }
    });
  }

  if (visited !== N) {
    console.log(0);
    return;
  }

  console.log(answer.join('\n'));
}
