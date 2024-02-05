class MinHeap {
  heap = [null];

  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
  }

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
    if (this.heap.length === 2) return this.heap.pop();

    this.swap(1, this.heap.length - 1);
    const minItem = this.heap.pop();

    let parentIdx = 1;
    let leftChildIdx = parentIdx * 2;
    let rightChildIdx = leftChildIdx + 1;

    while (this.heap[leftChildIdx]) {
      if (!this.heap[rightChildIdx]) {
        if (this.heap[parentIdx][1] > this.heap[leftChildIdx][1])
          this.swap(parentIdx, leftChildIdx);
        break;
      }

      const minIdx =
        this.heap[leftChildIdx][1] <= this.heap[rightChildIdx][1]
          ? leftChildIdx
          : rightChildIdx;

      if (this.heap[parentIdx][1] <= this.heap[minIdx][1]) break;

      this.swap(parentIdx, minIdx);
      parentIdx = minIdx;
      leftChildIdx = parentIdx * 2;
      rightChildIdx = leftChildIdx + 1;
    }

    return minItem;
  }
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

// N: 학생 수, M: 도로 개수, X: 목표지
const [N, M, X] = input[0].trim().split(' ').map(Number);

// 간선 정보 (정방향)
const adj = Array.from({ length: N }, () => []);

// 간선 정보 (역방향)
// 만약 간선 정보를 역방향이 아닌 원래 방향으로만 저장한다면 시작점 (N-1)개에서 도착점까지 최단 거리를 구하기 위해 N-1번 다익스트라를 반복
// 하지만 역뱡향으로 저장한다면 목적지에서 다익스트라를 한 번 사용해 각 시작점까지 최단 거리를 구할 수 있음
const reverseAdj = Array.from({ length: N }, () => []);

// 간선 정보 저장
for (let i = 1; i <= M; i++) {
  const [v, w, t] = input[i].trim().split(' ').map(Number);
  adj[v - 1].push([w - 1, t]);
  reverseAdj[w - 1].push([v - 1, t]);
}

// 각 마을에서 도착지까지 왕복 시간 저장
const ans = Array(N).fill(0);

// 역방향 간선 정보를 활용해 각 시작점에서 목적지까지 최단 시간 찾기
findMinTime(reverseAdj).forEach((time, idx) => {
  ans[idx] += time;
});

// 정방향 간선 정보를 활용해 목적지에서 각 시작점까지 최단 시간 찾기
findMinTime(adj).forEach((time, idx) => {
  ans[idx] += time;
});

console.log(Math.max(...ans));

// 목적지에서 각 시작점까지 최단 시간을 찾는 함수
function findMinTime(adj) {
  // 최종 선택 여부
  const visited = Array(N).fill(false);
  // 목적지 체크
  visited[X - 1] = true;

  // 각 위치 필요 시간 저장
  const times = Array(N).fill(Infinity);
  // 목적지 체크
  times[X - 1] = 0;

  const minHeap = new MinHeap();
  for (const [position, time] of adj[X - 1]) {
    times[position] = time;
    minHeap.push([position, time]);
  }

  // 모든 위치 확인 여부
  let cnt = 0;

  while (minHeap.heap.length > 1) {
    // 현재 위치, 현재 위치까지 필요한 시간
    const [now, time] = minHeap.pop();

    // 이전에 더 빠르게 도착했다면 제외
    if (visited[now]) continue;

    // 방문 체크
    visited[now] = true;
    // 카운트
    cnt++;

    // 모든 위치 최단 시간 저장 완료
    if (cnt === N - 1) return times;

    // 현재 위치에서 갈 수 있는 위치와 필요한 시간
    for (const [next, nextTime] of adj[now]) {
      // 이전 에 방문했거나 저장된 시간보다 더 걸린다면 생략
      if (visited[next] || times[next] <= time + nextTime) continue;

      // 더 짧은 시간 저장
      times[next] = time + nextTime;
      // minHeap push
      minHeap.push([next, times[next]]);
    }
  }
}
