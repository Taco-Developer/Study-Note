function solution(input) {
  class PriorityQueue {
    nodes = [null];
    length = 0;

    isEmpty() {
      return this.length === 0;
    }

    compare(idx1, idx2) {
      return this.nodes[idx1] < this.nodes[idx2];
    }

    swap(idx1, idx2) {
      [this.nodes[idx1], this.nodes[idx2]] = [
        this.nodes[idx2],
        this.nodes[idx1],
      ];
    }

    insert(node) {
      this.nodes.push(node);
      this.length++;
      this.up();
    }

    up() {
      let child = this.nodes.length - 1;
      let parent = child >> 1;

      while (parent > 0 && this.compare(child, parent)) {
        this.swap(child, parent);
        child = parent;
        parent = child >> 1;
      }
    }

    remove() {
      if (this.isEmpty()) return null;

      this.swap(1, this.nodes.length - 1);
      const minNode = this.nodes.pop();
      this.length--;
      this.down();

      return minNode;
    }

    down() {
      let parent = 1;
      let leftChild = parent << 1;
      let rightChild = leftChild + 1;

      while (this.nodes[leftChild]) {
        if (!this.nodes[rightChild]) {
          if (this.compare(leftChild, parent)) this.swap(leftChild, parent);
          break;
        }

        const minIdx = this.compare(leftChild, rightChild)
          ? leftChild
          : rightChild;

        if (this.compare(parent, minIdx)) break;
        this.swap(parent, minIdx);
        parent = minIdx;
        leftChild = parent << 1;
        rightChild = leftChild + 1;
      }
    }
  }

  const priorityQueue = new PriorityQueue();
  for (let i = 1; i <= input[0]; i++) priorityQueue.insert(input[i]);

  // 1. 카드 수가 가장 적은 카드 뭉치 2개를 뽑기
  // 2. 뽑은 두 카드 뭉치를 뭉쳐 하나의 카드 뭉치로 만들기
  // 3. 하나의 카드 뭉치로 만들면서 비교 횟수 저장
  // 전체 카드 뭉치의 개수가 1개가 될 때까지 1 ~ 3 반복
  let answer = 0;
  while (priorityQueue.length > 1) {
    const card1 = priorityQueue.remove();
    const card2 = priorityQueue.remove();

    const sum = card1 + card2;
    answer += sum;
    priorityQueue.insert(sum);
  }

  return answer;
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number);
console.log(solution(input));
