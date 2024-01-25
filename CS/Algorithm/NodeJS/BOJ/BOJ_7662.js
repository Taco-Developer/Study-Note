class PriorityQueue {
  // 루트를 1로 설정
  minHeap = [null];
  maxHeap = [null];

  // 삽입
  push(node) {
    this.removeDeletedNum(this.minHeap, true);
    this.removeDeletedNum(this.maxHeap, false);

    this.minHeap.push(node);
    this.maxHeap.push(node);

    // 최솟값 루트에 위치
    this.bottomToRoot(this.minHeap, true);
    // 최댓값 루트에 위치
    this.bottomToRoot(this.maxHeap, false);
  }

  minPop() {
    // 이미 삭제된 숫자 제거
    this.removeDeletedNum(this.minHeap, true);

    // 모든 숫자가 이미 삭제되었다면 null 반환
    if (this.minHeap.length === 1) return null;

    // 최솟값
    const min = this.minHeap[1];
    // 삭제 표시
    min[1] = true;
    // 마지막 위치의 값과 교환
    this.swap(this.minHeap, 1, this.minHeap.length - 1);
    // 제거
    this.minHeap.pop();
    // 최솟값 루트로 위치
    this.rootToBottom(this.minHeap, true);

    return min[0];
  }

  maxPop() {
    // 이미 삭제된 숫자 제거
    this.removeDeletedNum(this.maxHeap, false);

    // 모든 숫자가 이미 삭제되었다면 null 반환
    if (this.maxHeap.length === 1) return null;

    const max = this.maxHeap[1];
    max[1] = true;
    this.swap(this.maxHeap, 1, this.maxHeap.length - 1);
    this.maxHeap.pop();
    this.rootToBottom(this.maxHeap, false);

    return max[0];
  }
  // 위에서 아래로 내려가며 업데이트
  rootToBottom(heap, isMin) {
    let currentIdx = 1;
    let leftChildIdx = currentIdx * 2;
    let rightChildIdx = leftChildIdx + 1;

    if (isMin) {
      while (true) {
        // 왼쪽 자식이 없다면 단말 노드이므로 종료
        if (!heap[leftChildIdx]) {
          break;
        }

        // 오른쪽 자식이 없으면 왼쪽 자식과 루트를 비교
        if (!heap[rightChildIdx]) {
          // 최솟값을 부모로
          if (isMin && heap[currentIdx][0] > heap[leftChildIdx][0])
            this.swap(heap, currentIdx, leftChildIdx);
          break;
        }

        // 왼쪽 자식과 오른쪽 자식 중 더 작은 값을 가진 자식 위치 저장
        const minIdx =
          heap[leftChildIdx][0] < heap[rightChildIdx][0]
            ? leftChildIdx
            : rightChildIdx;

        // 이미 부모가 더 작으면 종료
        if (heap[currentIdx][0] <= heap[minIdx][0]) break;

        // 부모와 자식 교환
        this.swap(heap, currentIdx, minIdx);

        // 더 내려감
        currentIdx = minIdx;
        leftChildIdx = currentIdx * 2;
        rightChildIdx = leftChildIdx + 1;
      }
    } else {
      while (true) {
        if (!heap[leftChildIdx]) {
          break;
        }

        if (!heap[rightChildIdx]) {
          if (heap[currentIdx][0] < heap[leftChildIdx][0])
            this.swap(heap, currentIdx, leftChildIdx);
          break;
        }

        const maxIdx =
          heap[leftChildIdx][0] > heap[rightChildIdx][0]
            ? leftChildIdx
            : rightChildIdx;

        if (heap[currentIdx][0] >= heap[maxIdx][0]) break;

        this.swap(heap, currentIdx, maxIdx);
        currentIdx = maxIdx;
        leftChildIdx = currentIdx * 2;
        rightChildIdx = leftChildIdx + 1;
      }
    }
  }

  // 아래에서 위로 올라가며 업데이트
  bottomToRoot(heap, isMin) {
    let currentIdx = heap.length - 1;
    let parentIdx = Math.floor(currentIdx / 2);
    // 최솟값
    if (isMin) {
      while (currentIdx !== 1 && heap[parentIdx][0] > heap[currentIdx][0]) {
        // 부모가 더 크다면 자식과 부모 교환
        this.swap(heap, parentIdx, currentIdx);

        // 위로 올라기기
        currentIdx = parentIdx;
        parentIdx = Math.floor(parentIdx / 2);
      }
    } else {
      // 최댓값
      while (currentIdx !== 1 && heap[parentIdx][0] < heap[currentIdx][0]) {
        this.swap(heap, parentIdx, currentIdx);
        currentIdx = parentIdx;
        parentIdx = Math.floor(parentIdx / 2);
      }
    }
  }

  // 이미 삭제된 숫자 제거
  removeDeletedNum(heap, isMin) {
    while (heap.length !== 1 && heap[1][1]) {
      this.swap(heap, 1, heap.length - 1);
      heap.pop();
      this.rootToBottom(heap, isMin);
    }
  }

  swap(heap, parentIdx, childIdx) {
    [heap[parentIdx], heap[childIdx]] = [heap[childIdx], heap[parentIdx]];
  }

  clear() {
    this.maxHeap = [null];
    this.minHeap = [null];
  }
}

// solve1 - 메모리 초과 (입력값이 너무 많음)
// const input = require('fs')
//   .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
//   .toString()
//   .trim()
//   .split('\n');

// // 테스트 케이스
// const T = +input[0];

// // 정답
// let ans = '';

// // 입력 인덱스
// let inputIndex = 0;

// for (let t = 0; t < T; t++) {
//   const queue = new PriorityQueue();

//   inputIndex++;

//   // 명령어 개수
//   const dataNum = +input[inputIndex];
//   for (let i = 1; i <= dataNum; i++) {
//     // [명령어, 숫자]
//     const [method, data] = input[inputIndex + i].trim().split(' ');

//     // 삽입
//     if (method === 'I') {
//       const node = [+data, false];
//       queue.push(node);
//       continue;
//     }

//     // 최댓값 삭제
//     if (data == 1) {
//       queue.maxPop();
//       continue;
//     }

//     // 최솟값 삯제
//     queue.minPop();
//   }

//   inputIndex += dataNum;

//   // 최댓값, 최솟값 저장
//   const max = queue.maxPop();
//   const min = queue.minPop();

//   // 만약 null이라면 비어있음
//   if (max === null) {
//     ans += 'EMPTY\n';
//     continue;
//   }

//   if (min === null) {
//     ans += `${max} ${max}\n`;
//   } else {
//     ans += `${max} ${min}\n`;
//   }
// }

// console.log(ans.trim());

// solve2 - 메모리 초과 방지를 위해 하나씩 입력받음
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 입력 분기를 위한 변수
let cnt = 0;
// 전체 테스트 케이스 수
let T = 0;
// 현재 테스트 케이스 번호
let t = 0;
// 남은 연산 개수
let methodCnt = 0;
// 정답
let ans = '';
const queue = new PriorityQueue();

rl.on('line', (input) => {
  // 최초 입력 (테스트 케이스 개수)
  if (cnt === 0) {
    T = +input;
    cnt = 1;
  }
  // 연산 개수 입력
  else if (cnt === 1) {
    methodCnt = +input;
    cnt++;
    queue.clear();
  }
  // 연산 입력
  else {
    methodCnt--;
    const [method, data] = input.trim().split(' ');

    // 삽입
    if (method === 'I') {
      const node = [+data, false];
      queue.push(node);
      // 최댓값 삭제
    } else if (data === '1') {
      queue.maxPop();
      // 최솟값 삭제
    } else {
      queue.minPop();
    }

    if (methodCnt === 0) {
      t++;
      cnt = 1;

      // 최댓값, 최솟값 저장
      const max = queue.maxPop();
      const min = queue.minPop();

      // 만약 max가 null이라면 전부 비었다는 의미
      if (max === null) {
        ans += 'EMPTY\n';
      }
      // min만 null이라면 하나만 남았다는 의미
      else if (min === null) {
        ans += `${max} ${max}\n`;
      }
      // 둘 모두 null이 아니라면 최대 최소 저장
      else {
        ans += `${max} ${min}\n`;
      }
    }

    // 입력 종료
    if (T !== 0 && T === t) {
      rl.close();
    }
  }
});

rl.on('close', () => {
  console.log(ans.trim());
  process.exit();
});
