function solution(input) {
  class MinHeap {
    heap = [null];

    isEmpty() {
      return this.heap.length === 1;
    }

    compare(idx1, idx2) {
      return this.heap[idx1].cost < this.heap[idx2].cost;
    }

    swap(idx1, idx2) {
      [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
    }

    insert(node) {
      this.heap.push(node);
      this.up();
    }

    up() {
      let child = this.heap.length - 1;
      let parent = child >> 1;
      while (parent > 0 && this.compare(child, parent)) {
        this.swap(child, parent);

        child = parent;
        parent = child >> 1;
      }
    }

    delete() {
      if (this.heap.length === 1) return;

      this.swap(1, this.heap.length - 1);
      const minNode = this.heap.pop();
      this.down();

      return minNode;
    }

    down() {
      let parent = 1;
      let leftChild = parent << 1;
      let rightChild = leftChild + 1;

      while (this.heap[leftChild]) {
        if (!this.heap[rightChild]) {
          if (this.compare(leftChild, parent)) this.swap(leftChild, parent);
          break;
        }

        const minNodeIdx = this.compare(leftChild, rightChild)
          ? leftChild
          : rightChild;

        if (this.compare(parent, minNodeIdx)) break;
        this.swap(parent, minNodeIdx);

        parent = minNodeIdx;
        leftChild = parent << 1;
        rightChild = leftChild + 1;
      }
    }
  }

  const [N, M] = input[0].split(' ').map(Number);
  const maze = input.slice(1);

  const move = (N, M, maze) => {
    const visited = Array.from({ length: M }, () => Array(N).fill(Infinity));
    const minHeap = new MinHeap();
    const dy = [-1, 1, 0, 0];
    const dx = [0, 0, -1, 1];

    visited[0][0] = 0;
    minHeap.insert({ y: 0, x: 0, cost: 0 });

    while (!minHeap.isEmpty()) {
      const { y, x, cost } = minHeap.delete();

      if (y === M - 1 && x === N - 1) return cost;

      for (let i = 0; i < 4; i++) {
        const ny = y + dy[i];
        const nx = x + dx[i];
        if (ny < 0 || ny >= M || nx < 0 || nx >= N) continue;
        const nextCost = maze[ny][nx] === '1' ? cost + 1 : cost;
        if (visited[ny][nx] > nextCost) {
          visited[ny][nx] = nextCost;
          minHeap.insert({ y: ny, x: nx, cost: nextCost });
        }
      }
    }
  };

  return move(N, M, maze);
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');
console.log(solution(input));
