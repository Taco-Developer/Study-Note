class Queue {
  items = [];
  headIndex = 0;
  tailIndex = 0;

  isEmpty() {
    return this.headIndex === this.tailIndex;
  }

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
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

// 노드 개수
const N = +input[0];

// 트리 저장
const tree = Array.from({ length: N + 1 }, () => []);
for (let i = 1; i < N; i++) {
  // 간선
  const [v, w] = input[i]
    .trim()
    .split(' ')
    .map((num) => +num);

  tree[v].push(w);
  tree[w].push(v);
}

const queue = new Queue();
// 방문 처리 배열
const visited = Array(N + 1).fill(0);
// 해당 노드의 부모 노드로 방문 처리
for (const node of tree[1]) {
  queue.enqueue(node);
  visited[node] = 1;
}

while (!queue.isEmpty()) {
  const v = queue.dequeue();

  for (const w of tree[v]) {
    // 다음에 방문할 노드가 방문 처리가 되어 있다면 현재 노드는 부모 노드가 아님
    if (visited[w]) continue;

    queue.enqueue(w);
    visited[w] = v;
  }
}

console.log(visited.slice(2).join('\n'));
