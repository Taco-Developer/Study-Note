// 최대 힙
class MaxHeap {
  constructor() {
    this.heap = [];
  }

  // Heap에 숫자 삽입
  insert(num) {
    // 마지막에 삽입
    this.heap.push(num);

    // 삽입된 인덱스
    let currentIdx = this.heap.length - 1;
    let parentIdx = Math.floor((currentIdx - 1) / 2);

    // 현재 인덱스의 값이 부모 인덱스의 값 보다 큰 경우 반복
    while (currentIdx > 0 && this.heap[currentIdx] > this.heap[parentIdx]) {
      // 부모 값과 현재 값 위치 변경
      this.swap(parentIdx, currentIdx);
      // 현재 인덱스를 부모 인덱스로 변경
      currentIdx = parentIdx;
      parentIdx = Math.floor((currentIdx - 1) / 2);
    }
  }

  // Heap에서 숫자 추출
  extract() {
    // Heap이 비었으면 0 반환
    if (this.heap.length === 0) return 0;

    // root만 존재하는 경우 root 추출
    if (this.heap.length === 1) return this.heap.pop();

    // root 값이 최댓값
    const max = this.heap[0];
    // 마지막 값을 root로 이동시킴
    this.heap[0] = this.heap.pop();

    const heapLength = this.heap.length;

    // 현재, 왼쪽, 오른쪽 자식 인덱스 초기화
    let currentIdx = 0;
    let leftChildIdx = currentIdx * 2 + 1;
    let rightChildIdx = currentIdx * 2 + 2;

    // 왼쪽 자식이 있는 동안 부모, 왼쪽 자식, 오른쪽 자식 비교해서 큰 값을 부모에 위치시킴
    while (this.heap[leftChildIdx]) {
      // 부모, 왼쪽 자식, 오른쪽 자식 중 최댓값이 있는 인덱스
      let maxIdx = currentIdx;
      // 왼쪽 자식이 현재 저장된 max 인덱스 보다 크면 왼쪽 자식 인덱스로 변경
      if (this.heap[leftChildIdx] > this.heap[maxIdx]) maxIdx = leftChildIdx;

      // 오른쪽 자식이 현재 저장된 max 인덱스 보다 크면 오른쪽 자식 인덱스로 변경
      if (
        this.heap[rightChildIdx] &&
        this.heap[rightChildIdx] > this.heap[maxIdx]
      )
        maxIdx = rightChildIdx;

      // 최댓값 인덱스가 현재 인덱스와 같으면 반복 종료 (현재 값이 최댓값이므로 위치를 바꿀 필요X)
      if (maxIdx === currentIdx) break;

      // 최댓값이 위치한 인덱스와 현재 인덱스의 값 위치를 서로 변경
      this.swap(currentIdx, maxIdx);

      // 현재 인덱스를 최댓값 인덱스로 변경 후 왼쪽, 오른쪽 자식 인데스 구하기
      currentIdx = maxIdx;
      leftChildIdx = currentIdx * 2 + 1;
      rightChildIdx = currentIdx * 2 + 2;
    }

    return max;
  }

  // 각 인덱스 값의 위치를 서로 변경
  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1],
    ];
  }
}

// const inputs = require("fs")
//   .readFileSync("test.txt")
//   .toString()
//   .trim()
//   .split("\n");
const inputs = require("fs")
  .readFileSync("./dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [N, ...nums] = inputs.map((num) => Number(num));

const maxHeap = new MaxHeap();
let ans = "";

nums.forEach((num) => {
  if (num < 0) return;
  if (num === 0) {
    ans += `${maxHeap.extract()}\n`;
    return;
  }
  maxHeap.insert(num);
});

if (ans !== "") console.log(ans.trim());