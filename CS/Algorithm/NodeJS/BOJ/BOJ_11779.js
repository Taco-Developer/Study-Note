// 최소비용 구하기 2

class MinHeap {
  heap = [null];

  isEmpty() {
    return this.heap.length === 1;
  }

  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
  }

  heapPush(node) {
    this.heap.push(node);

    let curIdx = this.heap.length - 1;
    let parIdx = Math.floor(curIdx / 2);

    while (curIdx > 1 && this.heap[parIdx][1] > this.heap[curIdx][1]) {
      this.swap(curIdx, parIdx);

      curIdx = parIdx;
      parIdx = Math.floor(curIdx / 2);
    }
  }

  heapPop() {
    if (this.isEmpty()) return null;

    this.swap(1, this.heap.length - 1);
    const minNode = this.heap.pop();

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

    return minNode;
  }
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

solve(input);

function solve(input) {
  // n: 도시 개수
  const n = +input[0];
  // m: 버스 개수
  const m = +input[1];

  // 각 출발점에서 갈 수 있는 도착지와 비용 저장
  const graph = Array.from({ length: n + 1 }, () => []);
  input.slice(2, m + 2).forEach((data) => {
    const [start, end, cost] = data.trim().split(' ').map(Number);
    graph[start].push([end, cost]);
  });

  // start: 출발 도시, end: 도착 도시
  const [start, end] = input.pop().split(' ').map(Number);

  // 최종 비용과 도시별 이전 도시 정보
  const [cost, cityParent] = getRouteAndMinCost(start, end);

  let tmp = end;
  const route = [];
  while (tmp !== 0) {
    route.push(tmp);
    tmp = cityParent[tmp];
  }

  let ans = '';
  for (let i = route.length - 1; i >= 0; i--) {
    ans += `${route[i]} `;
  }

  console.log(`${cost}\n${route.length}\n${ans.trim()}`);

  function getRouteAndMinCost(start, end) {
    // 도시별 이전 도시 저장
    const cityParent = Array(n + 1).fill(0);

    const minHeap = new MinHeap();
    const costArray = Array(n + 1).fill(Infinity);

    costArray[start] = 0;
    minHeap.heapPush([start, 0]);

    while (!minHeap.isEmpty()) {
      // now : 현재 도시, nowCost: 누적 비용, past: 이전 도시
      const [now, nowCost] = minHeap.heapPop();

      // 최소 비용이 아닌 경우 패스
      if (costArray[now] < nowCost) continue;

      // 도착지에 도착하면 비용과 도시별 이전 위치 반환
      if (now === end) return [nowCost, cityParent];

      // 다음 도시 선택
      graph[now].forEach(([next, nextCost]) => {
        const totalCost = nowCost + nextCost;
        // 최소 비용인 경우
        if (costArray[next] > totalCost) {
          // 비용 및 이전 도시 업데이트
          costArray[next] = totalCost;
          cityParent[next] = now;
          // heapPush
          minHeap.heapPush([next, totalCost]);
        }
      });
    }
  }
}
