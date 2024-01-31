// 최단경로

class MinHeap {
  heap = [null];

  push(item) {
    this.heap.push(item);

    let curIdx = this.heap.length - 1;
    let parentIdx = Math.floor(curIdx / 2);

    while (curIdx > 1 && this.heap[parentIdx][1] > this.heap[curIdx][1]) {
      this.swap(curIdx, parentIdx);
      curIdx = parentIdx;
      parentIdx = Math.floor(curIdx / 2);
    }
  }

  pop() {
    if (this.heap.length === 1) return null;

    if (this.heap.length === 2) {
      return this.heap.pop();
    }

    this.swap(1, this.heap.length - 1);
    const popedItem = this.heap.pop();

    let curIdx = 1;
    let leftIdx = curIdx * 2;
    let rightIdx = leftIdx + 1;

    while (this.heap[leftIdx]) {
      if (!this.heap[rightIdx]) {
        if (this.heap[curIdx][1] > this.heap[leftIdx][1]) {
          this.swap(curIdx, leftIdx);
        }
        break;
      }

      const minIdx =
        this.heap[leftIdx][1] <= this.heap[rightIdx][1] ? leftIdx : rightIdx;

      if (this.heap[curIdx][1] <= this.heap[minIdx][1]) break;

      this.swap(curIdx, minIdx);

      curIdx = minIdx;
      leftIdx = curIdx * 2;
      rightIdx = leftIdx + 1;
    }

    return popedItem;
  }

  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
  }
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

// V: 정점의 개수, E: 간선의 개수
const [V, E] = input[0].trim().split(' ').map(Number);
// 시작점
const start = +input[1];

// graph 정보
const graph = Array.from({ length: V + 1 }, () => []);
for (let i = 2; i < E + 2; i++) {
  const [u, v, w] = input[i].trim().split(' ').map(Number);
  graph[u].push([v, w]);
}

// 방문 정보
const visited = Array(V + 1).fill(false);
// 가중치 정보
const weight = Array(V + 1).fill(Infinity);
// 최소 힙
const minHeap = new MinHeap();
// 시작 위치 가중치 변경 및 minHeap push
weight[start] = 0;
minHeap.push([start, weight[start]]);

while (minHeap.heap.length > 1) {
  // now : 현재 위치, w : 가중치
  // push 순서와 상관없이 가중치가 가장 작은 위치가 반환됨
  const [now, w] = minHeap.pop();

  // 이미 방문한 위치라면 제외
  if (visited[now]) continue;
  // 방문 처리
  visited[now] = true;

  // 간선 확인
  for (const [next, nextW] of graph[now]) {
    // 방문하지 않았고 현재 이전에 해당 위치로 갈 수 있었던 가중치가 현재 위치에서 해당 위치로 가는 데
    // 필요한 가중치보다 크다면 업데이트하고 minHeap에 push
    if (!visited[next] && weight[next] > weight[now] + nextW) {
      weight[next] = weight[now] + nextW;
      minHeap.push([next, weight[next]]);
    }
  }
}

console.log(
  weight
    .map((num) => (num !== Infinity ? num : 'INF'))
    .slice(1)
    .join('\n')
);
