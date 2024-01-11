class Queue {
  items = [];
  headIndex = 0;
  tailIndex = 0;

  enqueue(item) {
    this.items[this.tailIndex] = item;
    this.tailIndex++;
  }

  dequeue() {
    if (this.isEmpty()) return null;

    const headItem = this.items[this.headIndex];
    this.headIndex++;

    if (this.isEmpty()) {
      this.headIndex = 0;
      this.tailIndex = 0;
    }

    return headItem;
  }

  isEmpty() {
    return this.headIndex === this.tailIndex;
  }
}

// 입력
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

// 정점의 개수
const N = +input[0];

// 인접 행렬
const adj = [];
for (let i = 0; i < N; i++) {
  adj.push(
    input[i + 1]
      .trim()
      .split(' ')
      .map((num) => +num)
  );
}

// 모든 노드에서 확인
for (let start = 0; start < N; start++) {
  const visited = Array(N).fill(0);
  const queue = new Queue();

  // 시작 노드에서 갈 수 있는 노드 큐에 삽입 및 방문 처리
  for (let i = 0; i < N; i++) {
    if (adj[start][i] !== 1) continue;
    queue.enqueue(i);
    visited[i] = 1;
  }

  // 방문할 수 있는 노드가 있는 경우 반복
  while (!queue.isEmpty()) {
    // now: 시작 노드에서 이동한 노드
    const now = queue.dequeue();

    // now에서 갈 수 있고 방문 처리되지 않은 노드 큐에 삽입 및 방문 처리
    for (let i = 0; i < N; i++) {
      if (adj[now][i] && !visited[i]) {
        queue.enqueue(i);
        visited[i] = 1;
      }
    }
  }

  // 방문 처리된 위치가 시작 노드에서 갈  수 있는 노드
  // adj 업데이트
  visited.forEach((possible, index) => {
    if (possible) {
      adj[start][index] = 1;
    }
  });
}

// 출력
adj.forEach((ans) => {
  console.log(ans.join(' '));
});
