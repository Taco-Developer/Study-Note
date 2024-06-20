function solution(input) {
  class Queue {
    items = [];
    headIdx = 0;
    tailIdx = 0;

    isEmpty() {
      return this.headIdx === this.tailIdx;
    }

    push(item) {
      this.items[this.tailIdx] = item;
      this.tailIdx++;
    }

    pop() {
      if (this.isEmpty()) return null;
      const item = this.items[this.headIdx];
      this.headIdx++;

      if (this.isEmpty()) {
        this.headIdx = 0;
        this.tailIdx = 0;
      }

      return item;
    }
  }

  // N: 정점의 수, M: 간선의 수, R: 시작 정점
  const [N, M, R] = input[0].split(' ').map(Number);

  // E: 간선 정보
  const E = Array.from({ length: N }, () => []);
  for (let i = 1; i <= M; i++) {
    const [u, v] = input[i].split(' ').map((num) => +num - 1);
    E[u].push(v);
    E[v].push(u);
  }
  for (let i = 0; i < N; i++) E[i].sort((a, b) => a - b);

  const answer = Array(N).fill(0);
  let cnt = 1;

  // E: 간선 정보, now : 현재 정점, answer: 방문 순서 배열
  const bfs = (E, now, answer) => {
    const queue = new Queue();
    queue.push(now);
    answer[now] = cnt++;

    while (!queue.isEmpty()) {
      const v = queue.pop();

      E[v].forEach((next) => {
        if (answer[next]) return;
        answer[next] = cnt++;
        queue.push(next);
      });
    }
  };

  bfs(E, R - 1, answer);

  return answer.join('\n');
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');
console.log(solution(input));
