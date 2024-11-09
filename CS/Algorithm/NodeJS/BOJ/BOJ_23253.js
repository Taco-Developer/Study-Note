// 교과서를 하나씩 꺼내면서 확인하는 방법
class MinHeap {
  nodes = [null];

  compare(idx1, idx2) {
    return (
      this.nodes[idx1][1][this.nodes[idx1][0] - 1] <
      this.nodes[idx2][1][this.nodes[idx2][0] - 1]
    );
  }

  swap(idx1, idx2) {
    [this.nodes[idx1], this.nodes[idx2]] = [this.nodes[idx2], this.nodes[idx1]];
  }

  add(node) {
    this.nodes.push(node);

    let child = this.nodes.length - 1;
    let parent = child >> 1;
    while (parent > 0 && this.compare(child, parent)) {
      this.swap(parent, child);
      child = parent;
      parent = child >> 1;
    }
  }

  remove() {
    this.swap(1, this.nodes.length - 1);

    const minNode = this.nodes.pop();

    let parent = 1;
    let leftChild = parent << 1;
    let rightChild = leftChild + 1;

    while (this.nodes[leftChild]) {
      if (!this.nodes[rightChild]) {
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
  const [N, M] = input[0].split(' ').map(Number);

  // 교과서 더미의 마지막 책 번호를 기준으로 최소힙 생성 => [교과서 개수, 교과서 순서]
  const minHeap = new MinHeap();

  for (let i = 1; i < M * 2; i += 2) {
    minHeap.add([+input[i], input[i + 1].trim().split(' ').map(Number)]);
  }

  for (let i = 1; i <= N; i++) {
    const [cnts, books] = minHeap.remove();

    // 찾는 책이 아닌 경우 종료
    if (books.pop() !== i) {
      console.log('No');
      return;
    }

    // 책이 남아있는 경우 다시 힙에 추가
    if (cnts !== 1) minHeap.add([cnts - 1, books]);
  }

  console.log('Yes');
}

// 각 교과서 더미에 쌓인 책 번호를 확인하는 방법
// 모든 교과서 더미가 내림차순 정렬이 되어있으면 차례로 꺼낼 수 있음
function solution2(input) {
  const [_, M] = input[0].split(' ').map(Number);

  for (let i = 1; i < M * 2; i += 2) {
    const cnts = input[i];
    const books = input[i + 1].trim().split(' ').map(Number);

    // 교과서 더미 내림차순 확인
    for (let j = cnts - 1; j > 0; j--) {
      if (books[j] > books[j - 1]) {
        console.log('No');
        return;
      }
    }
  }

  console.log('Yes');
}

const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
solution2(input);
