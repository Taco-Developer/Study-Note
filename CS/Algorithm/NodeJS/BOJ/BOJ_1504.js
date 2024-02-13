class MinHeap {
  heap = [null];

  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
  }

  isEmpty() {
    return this.heap.length === 1;
  }

  heapPush(item) {
    this.heap.push(item);

    let curIdx = this.heap.length - 1;
    let parentIdx = Math.floor(curIdx / 2);

    while (curIdx > 1 && this.heap[curIdx][1] < this.heap[parentIdx][1]) {
      this.swap(curIdx, parentIdx);
      curIdx = parentIdx;
      parentIdx = Math.floor(curIdx / 2);
    }
  }

  heapPop() {
    if (this.isEmpty()) return null;

    this.swap(1, this.heap.length - 1);
    const minItem = this.heap.pop();

    let curIdx = 1;
    let leftIdx = curIdx * 2;
    let rightIdx = leftIdx + 1;

    while (this.heap[leftIdx]) {
      if (!this.heap[rightIdx]) {
        if (this.heap[curIdx][1] > this.heap[leftIdx][1])
          this.swap(curIdx, leftIdx);
        break;
      }

      const minIdx =
        this.heap[leftIdx][1] > this.heap[rightIdx][1] ? rightIdx : leftIdx;

      if (this.heap[curIdx][1] <= this.heap[minIdx][1]) break;

      this.swap(curIdx, minIdx);

      curIdx = minIdx;
      leftIdx = curIdx * 2;
      rightIdx = leftIdx + 1;
    }

    return minItem;
  }
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

//N: 정점 개수, E: 간선 개수
const [N, E] = input[0].trim().split(' ').map(Number);

const graph = Array.from({ length: N + 1 }, () => []);
// 간선 저장
for (let i = 1; i <= E; i++) {
  const [a, b, c] = input[i].trim().split(' ').map(Number);

  graph[a].push([b, c]);
  graph[b].push([a, c]);
}

// 반드시 방문해야 하는 두 정점
const [v1, v2] = input.pop().trim().split(' ').map(Number);

getTwoPassMinDistance();

// 출발점에서 목적지까지 두 정점을 지나서 가는 최단 거리 구하는 함수
// 1. 출발점 -> v1 -> v2 -> 목적지
// 2. 출발점 -> v2 -> v1 -> 목적지
function getTwoPassMinDistance2() {
  // 1번 확인
  let ans = dijkstra2(1, v1) + dijkstra2(v1, v2) + dijkstra2(v2, N);

  if (ans === Infinity) {
    console.log(-1);
    return;
  }

  // 1번과 2번 중 최솟값
  ans = Math.min(ans, dijkstra2(1, v2) + dijkstra2(v2, v1) + dijkstra2(v1, N));

  console.log(ans);
}

// 두 지점간 최단 거리 구하기
function dijkstra2(start, end) {
  const minHeap = new MinHeap();
  // 위치별 거리 저장하는 배열
  const distances = Array(N + 1).fill(Infinity);

  // 출발 위치 거리 저장 및 heapPush
  distances[start] = 0;
  minHeap.heapPush([start, 0]);

  while (!minHeap.isEmpty()) {
    const [now, nowDis] = minHeap.heapPop();

    if (now === end) break;

    // 다음 방문 위치에 저장된 값과 현재 누적 거리 + 갈 거리를 비교해서 업데이트
    // 업데이트했다면 heapPush
    graph[now].forEach(([next, distance]) => {
      const nextDis = nowDis + distance;
      if (distances[next] > nextDis) {
        distances[next] = nextDis;
        minHeap.heapPush([next, nextDis]);
      }
    });
  }

  return distances[end];
}

// 출발점에서 목적지까지 두 정점을 지나서 가는 최단 거리 구하는 함수
// 1. 출발점 -> v1 -> v2 -> 목적지
// 2. 출발점 -> v2 -> v1 -> 목적지
function getTwoPassMinDistance() {
  // 출발점에서 위치별 최단 거리
  const routeStart = dijkstra(1);
  // v1에서 위치별 최단 거리
  const routeV1 = dijkstra(v1);
  // v2에서 위치별 최단 거리
  const routeV2 = dijkstra(v2);

  const ans = Math.min(
    routeStart[v1] + routeV1[v2] + routeV2[N],
    routeStart[v2] + routeV2[v1] + routeV1[N]
  );

  console.log(ans === Infinity ? -1 : ans);
}

// 시작점에서 위치별 최단 거리
function dijkstra(start) {
  const minHeap = new MinHeap();
  // 위치별 거리 저장하는 배열
  const distances = Array(N + 1).fill(Infinity);

  // 출발 위치 거리 저장
  distances[start] = 0;

  // 출발점에서 갈 수 있는 위치 heapPush
  // 거리 업데이트
  graph[start].forEach(([next, distance]) => {
    distances[next] = distance;
    minHeap.heapPush([next, distance]);
  });

  while (!minHeap.isEmpty()) {
    // now: 현재 위치, nowDis: 현재까지 누적된 거리
    const [now, nowDis] = minHeap.heapPop();

    // 최단 거리가 아닌 경우 생략
    if (distances[now] < nowDis) continue;

    // 다음 방문 위치에 저장된 값과 현재 누적 거리 + 갈 거리를 비교해서 업데이트
    // 업데이트했다면 heapPush
    graph[now].forEach(([next, distance]) => {
      const nextDis = nowDis + distance;
      if (distances[next] > nextDis) {
        distances[next] = nextDis;
        minHeap.heapPush([next, nextDis]);
      }
    });
  }

  return distances;
}
