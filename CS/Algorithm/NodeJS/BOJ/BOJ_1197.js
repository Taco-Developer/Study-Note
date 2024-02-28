class Edge {
  constructor(from, to, weight) {
    this.from = from;
    this.to = to;
    this.weight = weight;
  }
}

// 가중치가 가장 작은 Edge가 Root에 위치
// class MinHeap {
//   heap = [null];

//   isEmpty() {
//     return this.heap.length === 1;
//   }

//   swap(idx1, idx2) {
//     [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
//   }

//   // 가중치가 작은 Edge가 우선 순위가 높음
//   compare(idx1, idx2) {
//     // 인수 중 먼저 들어온 인덱스의 Edge의 가중치가 더 작다면 true 반환
//     if (this.heap[idx1].weight < this.heap[idx2].weight) return true;
//     return false;
//   }

//   push(edge) {
//     this.heap.push(edge);

//     let curIdx = this.heap.length - 1;
//     let parIdx = Math.floor(curIdx / 2);

//     while (curIdx > 1 && this.compare(curIdx, parIdx)) {
//       this.swap(curIdx, parIdx);
//       curIdx = parIdx;
//       parIdx = Math.floor(curIdx / 2);
//     }
//   }

//   pop() {
//     if (this.isEmpty()) return null;

//     this.swap(1, this.heap.length - 1);
//     const minEdge = this.heap.pop();

//     let parIdx = 1;
//     let leftIdx = parIdx * 2;
//     let rightIdx = leftIdx + 1;

//     while (this.heap[leftIdx]) {
//       if (!this.heap[rightIdx]) {
//         if (this.compare(leftIdx, parIdx)) {
//           this.swap(leftIdx, parIdx);
//         }
//         break;
//       }

//       const minIdx = this.compare(leftIdx, rightIdx) ? leftIdx : rightIdx;
//       if (this.compare(parIdx, minIdx)) break;

//       this.swap(parIdx, minIdx);
//       parIdx = minIdx;
//       leftIdx = parIdx * 2;
//       rightIdx = leftIdx + 1;
//     }

//     return minEdge;
//   }
// }

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

// solve(input);
solve2(input);

// 크루스칼 알고리즘 활용
function solve(input) {
  // V: 정점의 개수, E: 간선의 개수
  const [V, E] = input[0].trim().split(' ').map(Number);

  // 모든 간선을 minHeap에 추가
  const minHeap = new MinHeap();
  input.slice(1, E + 1).forEach((edge) => {
    const [from, to, weight] = edge.trim().split(' ').map(Number);
    minHeap.push(new Edge(from, to, weight));
  });

  // 각 노드의 부모를 저장 (노드 자신을 부모로 초기화)
  const parents = Array.from({ length: V + 1 }, (_, i) => i);

  // 최종 가중치 합
  let total = 0;

  // 가중치가 작은 순서로 반복
  while (!minHeap.isEmpty()) {
    const edge = minHeap.pop();

    // edge.to의 최종 조상
    const rv = findParent(edge.to);
    // edge.from의 최종 조상
    const rw = findParent(edge.from);

    // to와 from의 최종 조상이 다르다면 사이클이 생기지 않음
    // 최종 조상이 같다면 현재 간선을 선택하는 경우 어디선가 사이클이 생김
    if (!isSameParent(rv, rw)) {
      // 트리에 추가
      union(rv, rw);
      // 가중치 더하기
      total += edge.weight;
    }
  }

  console.log(total);

  // 최종 조상을 찾는 함수
  function findParent(v) {
    if (parents[v] === v) return v;
    return (parents[v] = findParent(parents[v]));
  }

  // 트리에 추가하는 함수
  // 번호가 큰 쪽 부모를 작은 쪽으로 변경
  function union(rv, rw) {
    if (rv < rw) {
      parents[rw] = rv;
    } else {
      parents[rv] = rw;
    }
  }

  // 최종 조상 일치 여부 반환 함수
  function isSameParent(rv, rw) {
    if (rv === rw) return true;
    return false;
  }
}

class Vertex {
  constructor(to, weight) {
    this.to = to;
    this.weight = weight;
  }
}

// 가중치가 가장 작은 Vertext가 Root에 위치
class MinHeap {
  heap = [null];

  isEmpty() {
    return this.heap.length === 1;
  }

  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
  }

  // 가중치가 작은 Vertex가 우선 순위가 높음
  compare(idx1, idx2) {
    // 인수 중 먼저 들어온 인덱스 Vertex의 가중치가 더 작다면 true 반환
    if (this.heap[idx1].weight < this.heap[idx2].weight) return true;
    return false;
  }

  push(vertex) {
    this.heap.push(vertex);

    let curIdx = this.heap.length - 1;
    let parIdx = Math.floor(curIdx / 2);

    while (curIdx > 1 && this.compare(curIdx, parIdx)) {
      this.swap(curIdx, parIdx);
      curIdx = parIdx;
      parIdx = Math.floor(curIdx / 2);
    }
  }

  pop() {
    if (this.isEmpty()) return null;

    this.swap(1, this.heap.length - 1);
    const minVertex = this.heap.pop();

    let parIdx = 1;
    let leftIdx = parIdx * 2;
    let rightIdx = leftIdx + 1;

    while (this.heap[leftIdx]) {
      if (!this.heap[rightIdx]) {
        if (this.compare(leftIdx, parIdx)) {
          this.swap(leftIdx, parIdx);
        }
        break;
      }

      const minIdx = this.compare(leftIdx, rightIdx) ? leftIdx : rightIdx;
      if (this.compare(parIdx, minIdx)) break;

      this.swap(parIdx, minIdx);
      parIdx = minIdx;
      leftIdx = parIdx * 2;
      rightIdx = leftIdx + 1;
    }

    return minVertex;
  }
}

// 프림 알고리즘 활용
function solve2(input) {
  // V: 정점의 개수, E: 간선의 개수
  const [V, E] = input[0].trim().split(' ').map(Number);
  // 각 정점 선택 여부
  const visited = Array(V + 1).fill(false);

  // 각 정점에서 갈 수 있는 간선 저장
  const adjacency = Array.from({ length: V + 1 }, () => []);
  input.slice(1, E + 1).forEach((edge) => {
    const [from, to, weight] = edge.trim().split(' ').map(Number);
    adjacency[from].push(new Vertex(to, weight));
    adjacency[to].push(new Vertex(from, weight));
  });

  const minHeap = new MinHeap();

  // 시작 정점 선택
  minHeap.push(new Vertex(1, 0));

  // 최소 신장 트리의 가중치 합
  let total = 0;

  while (!minHeap.isEmpty()) {
    // 트리에 추가된 정점
    const fromVertex = minHeap.pop();
    // 가려는 정점
    const toVertex = fromVertex.to;
    const weight = fromVertex.weight;

    // 이미 트리에 추가된 정점으로 다시 가려고 하면 패스
    if (visited[toVertex]) continue;

    visited[toVertex] = true;
    total += weight;

    // 아직 트리에 추가되지 않은 정점으로 가는 경우 minHeap 추가
    adjacency[toVertex].forEach((vertex) => {
      if (visited[vertex.to]) return;
      minHeap.push(vertex);
    });
  }

  console.log(total);
}
