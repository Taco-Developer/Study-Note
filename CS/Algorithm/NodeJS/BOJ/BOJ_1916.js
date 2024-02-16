class MinHeap {
  heap = [null];

  isEmpty() {
    return this.heap.length === 1;
  }

  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
  }

  push(node) {
    this.heap.push(node);

    let curIdx = this.heap.length - 1;
    let parIdx = Math.floor(curIdx / 2);

    // 현재값이 적절한 위치에 오도록 반복
    // 부모랑 비교해서 더 작은 값이 부모에 위치
    while (curIdx > 1 && this.heap[parIdx][1] > this.heap[curIdx][1]) {
      this.swap(curIdx, parIdx);
      curIdx = parIdx;
      parIdx = Math.floor(curIdx / 2);
    }
  }

  pop() {
    if (this.isEmpty()) return null;

    // 최솟값을 마지막 값과 위치를 변경 후 꺼내기
    this.swap(1, this.heap.length - 1);
    const min = this.heap.pop();

    let curIdx = 1;
    let leftIdx = curIdx * 2;
    let rightIdx = leftIdx + 1;

    // 왼쪽 자식이 있는 경우 반복
    while (this.heap[leftIdx]) {
      // 오른쪽 자식이 없는 경우 왼쪽과 비교 후 반복 종료
      if (!this.heap[rightIdx]) {
        if (this.heap[curIdx][1] > this.heap[leftIdx][1])
          this.swap(curIdx, leftIdx);
        break;
      }

      // 왼쪽과 오른쪽 중 최솟값 위치 확인
      const minIdx =
        this.heap[leftIdx][1] > this.heap[rightIdx][1] ? rightIdx : leftIdx;

      // 최솟값이 현재값보다 크거나 같은 경우 반복 종료
      if (this.heap[curIdx][1] <= this.heap[minIdx][1]) break;

      // 최솟값과 현재 위치 변경
      this.swap(curIdx, minIdx);

      // 현재 위치 업데이트
      curIdx = minIdx;
      leftIdx = curIdx * 2;
      rightIdx = leftIdx + 1;
    }

    // 최솟값 반환
    return min;
  }
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

main(input);

function main(input) {
  // N: 도시 개수
  const N = +input[0];
  // M: 버스 개수
  const M = +input[1];

  const graph = Array.from({ length: N + 1 }, () => []);
  for (let i = 2; i < M + 2; i++) {
    const [start, end, cost] = input[i].trim().split(' ').map(Number);
    graph[start].push([end, cost]);
  }

  // start: 출발지, end: 목적지
  const [start, end] = input[M + 2].trim().split(' ').map(Number);

  console.log(getMinCost(start, end));

  // 출발지에서 도착지까지 최소 비용 반환 함수
  function getMinCost(start, end) {
    const minHeap = new MinHeap();
    // 각 도시에 도달하는데 필요한 비용
    const costArray = Array(N + 1).fill(Infinity);
    // 시작 위치 0으로 초기화 및 heapPush
    costArray[start] = 0;
    minHeap.push([start, 0]);

    while (!minHeap.isEmpty()) {
      const [now, nowCost] = minHeap.pop();

      // 최솟값이 아닌 경우 패스
      if (costArray[now] < nowCost) continue;

      // 목적지 도착하면 비용 반환
      if (now === end) return nowCost;

      graph[now].forEach(([next, nextCost]) => {
        // 다음 위치 도달에 필요한 비용
        const costSum = nowCost + nextCost;
        // 비용이 최솟값이라면 업데이트 후 heapPush
        if (costArray[next] > costSum) {
          costArray[next] = costSum;
          minHeap.push([next, costSum]);
        }
      });
    }
  }
}
