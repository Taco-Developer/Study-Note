class PriorityQueue {
  nodes = [null];
  nodesLen = 0;

  compare(idx1, idx2) {
    return this.nodes[idx1] <= this.nodes[idx2];
  }

  swap(parent, child) {
    [this.nodes[parent], this.nodes[child]] = [
      this.nodes[child],
      this.nodes[parent],
    ];
  }

  push(node) {
    this.nodes.push(node);
    this.nodesLen++;

    // 우선순위(값이 작은 순서)에 따라 배치
    let child = this.nodesLen - 1;
    let parent = child >> 1;
    while (parent > 0 && this.compare(child, parent)) {
      this.swap(parent, child);
      child = parent;
      parent = child >> 1;
    }
  }

  pop() {
    if (this.nodesLen === 0) return null;

    // 가장 작은 값 Queue에서 빼기
    this.swap(1, this.nodesLen);
    const minNode = this.nodes.pop();
    this.nodesLen--;

    // 우선순위(값이 작은 순서)에 따라 배치
    let parent = 1;
    let leftChild = parent << 1;
    let rightChild = leftChild + 1;
    while (leftChild < this.nodesLen) {
      if (rightChild >= this.nodesLen) {
        if (this.compare(leftChild, parent)) this.swap(parent, leftChild);
        break;
      }

      const minChild = this.compare(leftChild, rightChild)
        ? leftChild
        : rightChild;

      if (this.compare(parent, minChild)) break;
      this.swap(parent, minChild);

      parent = minChild;
      leftChild = parent << 1;
      rightChild = leftChild + 1;
    }

    return minNode;
  }
}

function solution(input) {
  const N = +input[0];
  const classes = input
    .slice(1)
    .map((row) => {
      const [start, end] = row.split(' ').map(Number);
      return { start, end };
    })
    .sort((a, b) => {
      if (a.start === b.start) return a.end - b.end;
      return a.start - b.start;
    });

  // 수업 중인 강의실
  const classRooms = new PriorityQueue();
  classRooms.push(classes[0].end);

  // 지금까지 최대로 열린 강의실 수
  let answer = 1;

  for (let i = 1; i < N; i++) {
    // 수업이 끝난 강의실 비우기
    while (classRooms.nodesLen > 0 && classRooms.nodes[1] <= classes[i].start) {
      classRooms.pop();
    }

    // 수업 시작
    classRooms.push(classes[i].end);
    answer = Math.max(answer, classRooms.nodesLen);
  }

  console.log(answer);
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath, 'utf-8').toString().trim().split('\n');

solution(input);
