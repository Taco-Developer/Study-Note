// 숨바꼭질 3

class MinHeap {
  // index를 1부터 사용
  heap = [null];

  // 위치 교환
  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
  }

  push(item) {
    this.heap.push(item);

    let curIdx = this.heap.length - 1;
    let parentIdx = Math.floor(curIdx / 2);

    // 마지막 노드에서 루트로 올라가며 최솟값을 부모 노드에 위치시킴
    while (curIdx > 1 && this.heap[curIdx][1] < this.heap[parentIdx][1]) {
      this.swap(curIdx, parentIdx);

      curIdx = parentIdx;
      parentIdx = Math.floor(curIdx / 2);
    }
  }

  pop() {
    // 비어있는 경우
    if (this.heap.length === 1) return null;

    // 1개만 있는 경우
    if (this.heap.length === 2) return this.heap.pop();

    this.swap(1, this.heap.length - 1);
    const minItem = this.heap.pop();

    // 루트에서 아래로 내려가며 최솟값을 부모 노드에 위치시킴
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

    return minItem;
  }
}

const [N, K] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

function move() {
  // 방문 여부
  const visited = Array(K * 2).fill(false);
  // 최소 힙
  const minHeap = new MinHeap();
  minHeap.push([N, 0]);

  while (minHeap.heap.length !== 1) {
    // [현재 위치, 현재 시간]
    const [now, time] = minHeap.pop();

    // 이전에 방문한 경우
    if (visited[now]) continue;

    // 방문 표시
    visited[now] = true;

    // 동생 위치 도착
    if (now === K) return time;

    // 동생보다 왼쪽에 있는 경우
    if (now < K) {
      // 순간이동
      minHeap.push([now * 2, time]);
      // +1 이동
      minHeap.push([now + 1, time + 1]);
    }

    // -1 이동
    if (now > 0) minHeap.push([now - 1, time + 1]);
  }
}

console.log(move());
