class Queue {
  items = [];
  headIdx = 0;
  tailIdx = 0;

  isEmpty() {
    return this.headIdx === this.tailIdx;
  }

  add(item) {
    this.items[this.tailIdx++] = item;
  }

  remove() {
    return this.items[this.headIdx++];
  }
}

function solution(input) {
  const [N, M] = input[0].split(' ').map(Number);

  // x => y 정보 저장
  const graph = Array.from({ length: N + 1 }, () => []);
  for (let i = 1; i <= M; i++) {
    const [x, y] = input[i].split(' ').map(Number);
    graph[x].push(y);
  }

  const visited = Array.from({ length: N + 1 }, () => -1);
  const queue = new Queue();

  // 시작 위치 방문 및 queue 삽입
  visited[1] = 0;
  queue.add(1);

  while (!queue.isEmpty()) {
    const now = queue.remove();

    // 다음 위치 확인
    for (const next of graph[now]) {
      if (visited[next] !== -1) continue;
      visited[next] = visited[now] + 1;
      queue.add(next);
    }

    // 목적지 도달한 경우 종료
    if (visited[N] !== -1) break;
  }

  console.log(visited[N]);
}

const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
