function solution(input) {
  class MinHeap {
    nodes = [null];

    compare(idx1, idx2) {
      return this.nodes[idx1].value < this.nodes[idx2].value;
    }

    swap(idx1, idx2) {
      [this.nodes[idx1], this.nodes[idx2]] = [
        this.nodes[idx2],
        this.nodes[idx1],
      ];
    }

    add(node) {
      this.nodes.push(node);

      let child = this.nodes.length - 1;
      let parent = child >> 1;
      while (parent > 0 && this.compare(child, parent)) {
        this.swap(child, parent);
        child = parent;
        parent = child >> 1;
      }
    }

    remove() {
      if (this.nodes.length === 1) return null;

      this.swap(1, this.nodes.length - 1);
      const minNode = this.nodes.pop();

      let parent = 1;
      let leftChild = parent * 2;
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
        leftChild = parent * 2;
        rightChild = leftChild + 1;
      }

      return minNode;
    }
  }

  // 위험, 죽음 구역 체크하는 함수
  const checkArea = (position, area, data) => {
    const [x1, y1, x2, y2] = position.split(' ').map(Number);

    const sy = Math.min(y1, y2);
    const ty = Math.max(y1, y2);
    const sx = Math.min(x1, x2);
    const tx = Math.max(x1, x2);

    for (let y = sy; y <= ty; y++) {
      for (let x = sx; x <= tx; x++) {
        area[y][x] = data;
      }
    }
  };

  // (0, 0)에서 (500, 500)으로 이동하며 최소로 읽은 생명 반환하는 함수
  const move = (area) => {
    const visited = Array.from({ length: 501 }, () =>
      Array(501).fill(Infinity)
    );
    const minHeap = new MinHeap();
    const direction = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    visited[0][0] = 0;
    minHeap.add({ y: 0, x: 0, value: 0 });

    while (minHeap.nodes.length > 1) {
      const { y, x, value } = minHeap.remove();

      // (500, 500) 도달
      if (y === 500 && x === 500) return value;

      // 4방향 확인
      for (let i = 0; i < 4; i++) {
        const ny = y + direction[i][0];
        const nx = x + direction[i][1];

        if (ny < 0 || ny > 500 || nx < 0 || nx > 500 || area[ny][nx] === 2)
          continue;

        const nextValue = area[ny][nx] === 1 ? value + 1 : value;

        if (visited[ny][nx] > nextValue) {
          visited[ny][nx] = nextValue;
          minHeap.add({
            y: ny,
            x: nx,
            value: nextValue,
          });
        }
      }
    }

    // (500, 500)에 도달하지 못하는 경우
    return -1;
  };

  const area = Array.from({ length: 501 }, () => Array(501).fill(0));

  const N = +input[0];
  const M = +input[N + 1];

  // 위험 구역 체크
  for (let i = 1; i <= N; i++) {
    checkArea(input[i], area, 1);
  }

  // 죽음 구역 체크
  for (let i = N + 2; i < N + M + 2; i++) {
    checkArea(input[i], area, 2);
  }

  return move(area);
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');
console.log(solution(input));
