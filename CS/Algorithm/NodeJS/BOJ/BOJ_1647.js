// 도시 분할 계획
// 최소 신장 트리로 순환이 없는 하나의 마을을 만든 후, 가장 유지비가 큰 길 하나를 제거해 두 개의 마을로 분할

class Vertex {
  constructor(to, cost) {
    this.to = to;
    this.cost = cost;
  }
}

class Edge {
  constructor(from, to, cost) {
    this.from = from;
    this.to = to;
    this.cost = cost;
  }
}

class MinHeap {
  heap = [null];

  isEmpty() {
    return this.heap.length === 1;
  }

  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
  }

  compare(idx1, idx2) {
    if (this.heap[idx1].cost < this.heap[idx2].cost) return true;
    return false;
  }

  push(vertex) {
    this.heap.push(vertex);

    let childIdx = this.heap.length - 1;
    let parentIdx = Math.floor(childIdx / 2);

    while (childIdx > 1 && this.compare(childIdx, parentIdx)) {
      this.swap(childIdx, parentIdx);
      childIdx = parentIdx;
      parentIdx = Math.floor(childIdx / 2);
    }
  }

  pop() {
    if (this.isEmpty()) return null;

    this.swap(1, this.heap.length - 1);
    const minVertex = this.heap.pop();

    let parentIdx = 1;
    let leftIdx = parentIdx * 2;
    let rightIdx = leftIdx + 1;

    while (this.heap[leftIdx]) {
      if (!this.heap[rightIdx]) {
        if (this.compare(leftIdx, parentIdx)) this.swap(parentIdx, leftIdx);
        break;
      }

      const minIdx = this.compare(leftIdx, rightIdx) ? leftIdx : rightIdx;

      if (this.compare(parentIdx, minIdx)) break;

      this.swap(parentIdx, minIdx);
      parentIdx = minIdx;
      leftIdx = parentIdx * 2;
      rightIdx = leftIdx + 1;
    }

    return minVertex;
  }
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

solve(input);

// Prim Algorithm
function solve(input) {
  // N: 집의 개수, M: 길의 개수
  const [N, M] = input[0].trim().split(' ').map(Number);

  // 간선 정보 저장 adjacency[i] = [...] => i와 연결된 도로
  const adjacency = Array.from({ length: N + 1 }, () => []);
  input.slice(1, M + 1).forEach((edge) => {
    const [from, to, cost] = edge.trim().split(' ').map(Number);
    adjacency[from].push(new Vertex(to, cost));
    adjacency[to].push(new Vertex(from, cost));
  });

  // 총 유지비
  let totalCost = 0;
  // 최대 유지비
  let maxCost = 0;
  // 연결된 도로 개수
  let cnt = 0;

  // 마을 연결 여부
  const visited = Array(N + 1).fill(false);

  const minHeap = new MinHeap();
  minHeap.push(new Vertex(1, 0));

  // 최소 신장 트리의 간선 개수 = 정점 개수 - 1
  // 시작 정점까지 길도 포함하므로 cnt < N
  while (!minHeap.isEmpty() && cnt < N) {
    // 출발지
    const fromVertex = minHeap.pop();
    // 도착지
    const toVertex = fromVertex.to;
    // 유지비
    const cost = fromVertex.cost;

    // 이미 연결된 마을 패스
    if (visited[toVertex]) continue;

    // 도착 여부, 총 유지비, 최대 유지비, 연결된 도로 개수 업데이트
    visited[toVertex] = true;
    totalCost += cost;
    maxCost = Math.max(maxCost, cost);
    cnt++;

    // 아직 연결되지 않았고 갈 수 있는 마을 및 유지비 minHeap 추가
    adjacency[toVertex].forEach((nextVertex) => {
      if (visited[nextVertex.to]) return;
      minHeap.push(nextVertex);
    });
  }

  // 최대 유지비 도로 제거
  console.log(totalCost - maxCost);
}

// Kruskal Algorithm
function solve2(input) {
  // N: 마을 개수, M: 길 개수
  const [N, M] = input[0].trim().split(' ').map(Number);

  const parents = Array.from({ length: N + 1 }, (_, i) => i);
  const minHeap = new MinHeap();
  input.slice(1, M + 1).forEach((edge) => {
    const [from, to, cost] = edge.trim().split(' ').map(Number);
    minHeap.push(new Edge(from, to, cost));
  });

  let totalCost = 0;
  let cnt = 0;

  while (!minHeap.isEmpty() && cnt < N - 2) {
    const edge = minHeap.pop();
    const rv = findParent(edge.from);
    const rw = findParent(edge.to);

    if (rv === rw) continue;
    union(rv, rw);
    totalCost += edge.cost;
    cnt++;
  }

  console.log(totalCost);

  function findParent(v) {
    if (parents[v] === v) return v;
    return (parents[v] = findParent(parents[v]));
  }

  function union(rv, rw) {
    if (rv < rw) {
      parents[rw] = rv;
    } else {
      parents[rv] = rw;
    }
  }
}
