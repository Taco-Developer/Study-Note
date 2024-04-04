// 문제집
class PriorityQueue {
  nodes = [null];

  isEmpty() {
    return this.nodes.length === 1;
  }

  compare(idx1, idx2) {
    if (this.nodes[idx1] < this.nodes[idx2]) return true;
    return false;
  }

  swap(idx1, idx2) {
    [this.nodes[idx1], this.nodes[idx2]] = [this.nodes[idx2], this.nodes[idx1]];
  }

  enqueue(node) {
    this.nodes.push(node);

    let child = this.nodes.length - 1;
    let parent = child >> 1;

    while (child > 1 && this.compare(child, parent)) {
      this.swap(child, parent);
      child = parent;
      parent = child >> 1;
    }
  }

  dequeue() {
    if (this.isEmpty()) return null;
    this.swap(1, this.nodes.length - 1);

    const minNode = this.nodes.pop();

    let parent = 1;
    let left = parent << 1;
    let right = left + 1;
    while (this.nodes[left]) {
      if (!this.nodes[right]) {
        if (this.compare(left, parent)) this.swap(left, parent);
        break;
      }

      const minIdx = this.compare(left, right) ? left : right;
      if (this.compare(parent, minIdx)) break;

      this.swap(parent, minIdx);
      parent = minIdx;
      left = parent << 1;
      right = left + 1;
    }

    return minNode;
  }
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

solve();

function solve() {
  const [N, M] = input[0].split(' ').map(Number);
  const graph = Array.from({ length: N + 1 }, () => []);
  // indegree[i] => i 문제를 풀기위해 풀어야하는 문제 개수
  const indegree = Array(N + 1).fill(0);

  input.slice(1, M + 1).map((row) => {
    const [from, to] = row.split(' ').map(Number);
    graph[from].push(to);
    indegree[to]++;
  });

  // minHeap => 난이도가 가장 낮은 문제가 root에 위치
  const minHeap = new PriorityQueue();
  for (let i = 1; i <= N; i++) {
    if (indegree[i]) continue;
    // 풀 수 있는 문제 minHeap에 추가
    minHeap.enqueue(i);
  }

  const answer = [];

  while (!minHeap.isEmpty()) {
    const problem = minHeap.dequeue();
    answer.push(problem);

    // 현재 문제를 풀면 풀 수 있는 문제 확인
    graph[problem].forEach((next) => {
      indegree[next]--;
      if (indegree[next] !== 0) return;
      // 필수 풀이 문제 개수가 0이 되면 minHeap 추가
      minHeap.enqueue(next);
    });
  }

  console.log(answer.join(' '));
}
