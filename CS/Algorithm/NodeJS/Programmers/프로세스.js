function solution(priorities, location) {
  class Queue {
    items = [];
    headIdx = 0;
    tailIdx = 0;

    isEmpty() {
      return this.headIdx === this.tailIdx;
    }

    getLength() {
      return this.tailIdx - this.headIdx;
    }

    add(item) {
      this.items[this.tailIdx] = item;
      this.tailIdx++;
    }

    remove() {
      const item = this.items[this.headIdx];
      this.headIdx++;
      return item;
    }
  }

  // 대기 큐에 프로세스 추가
  const queue = new Queue();
  priorities.forEach((priority) => {
    queue.add(priority);
  });

  // priorities => 내림차순 정렬
  let maxIdx = 0;
  priorities.sort((a, b) => b - a);

  while (!queue.isEmpty()) {
    // 대기 큐 가장 앞에 있는 프로세스 확인
    const process = queue.remove();
    // 목표 위치 한 칸 당기기
    location--;

    // 남아있는 우선 순위 최댓값과 일치
    if (process === priorities[maxIdx]) {
      maxIdx++;
      // 목표 프로세스인 경우 종료
      if (location === -1) return maxIdx;
    } else {
      // 현재 프로세스가 목표 프로세스인 경우 위치 업데이트
      if (location === -1) location = queue.getLength();
      queue.add(process);
    }
  }
}
