class Node {
  constructor(r, c, cost) {
    this.r = r;
    this.c = c;
    this.cost = cost;
  }
}

class MinHeap {
  nodes = [null];

  isEmpty() {
    return this.nodes.length === 1;
  }

  isSmall(idx1, idx2) {
    return this.nodes[idx1].cost <= this.nodes[idx2].cost;
  }

  swap(idx1, idx2) {
    [this.nodes[idx1], this.nodes[idx2]] = [this.nodes[idx2], this.nodes[idx1]];
  }

  push(node) {
    this.nodes.push(node);

    // 삽입한 노드의 위치 수정(최소 힙 유지)
    let child = this.nodes.length - 1;
    let parent = child >> 1;

    while (parent > 0 && this.isSmall(child, parent)) {
      this.swap(parent, child);
      child = parent;
      parent = child >> 1;
    }
  }

  pop() {
    if (this.isEmpty()) return null;

    //  마지막 노드와  첫 노드 위치 교체 후 최소 힙에서 빼기
    this.swap(1, this.nodes.length - 1);
    const minNode = this.nodes.pop();

    // 마지막 노드 위치 수정(최소 힙 유지)
    let parent = 1;
    let leftChild = parent << 1;
    let rightChild = leftChild + 1;

    while (this.nodes[leftChild]) {
      if (!this.nodes[rightChild]) {
        if (this.isSmall(leftChild, parent)) this.swap(parent, leftChild);
        break;
      }

      const minNode = this.isSmall(leftChild, rightChild)
        ? leftChild
        : rightChild;

      if (this.isSmall(parent, minNode)) break;

      this.swap(parent, minNode);

      parent = minNode;
      leftChild = parent << 1;
      rightChild = leftChild + 1;
    }

    // 최소 힙에서 뺀 가장 비용이 작은 노드 반환
    return minNode;
  }
}

function solution(input) {
  let inputIdx = 0;
  let caseNum = 0;

  const answer = [];

  while (true) {
    const N = +input[inputIdx++];
    if (N === 0) break;

    caseNum++;

    // 동굴 정보
    const cave = [];
    for (let i = 0; i < N; i++) {
      cave[i] = input[inputIdx++].trim().split(' ').map(Number);
    }

    // 방향
    const dr = [-1, 1, 0, 0];
    const dc = [0, 0, -1, 1];

    // 최소힙
    const minHeap = new MinHeap();
    // 방문 정보(visited[r][c]: r, c 도달하는데 필요한 최소 비용)
    const visited = Array.from({ length: N }, () => Array(N).fill(Infinity));

    minHeap.push(new Node(0, 0, cave[0][0]));
    visited[0][0] = cave[0][0];

    while (!minHeap.isEmpty()) {
      const { r, c, cost } = minHeap.pop();
      // 최소 비용이 아님
      if (cost > visited[r][c]) continue;

      // 최초 목표 도달(최소 비용)
      if (r === N - 1 && c === N - 1) {
        answer.push(`Problem ${caseNum}: ${cost}`);
        break;
      }

      // 현 위치에서 상하좌우 확인
      for (let i = 0; i < 4; i++) {
        const nr = r + dr[i];
        const nc = c + dc[i];

        if (
          // 범위 벗어남
          nr < 0 ||
          nr >= N ||
          nc < 0 ||
          nc >= N ||
          // 최소 비용 아님
          visited[nr][nc] <= cost + cave[nr][nc]
        )
          continue;

        // 현재까지 최소 비용 저장 후 최소힙에 추가
        visited[nr][nc] = cost + cave[nr][nc];
        minHeap.push(new Node(nr, nc, visited[nr][nc]));
      }
    }
  }

  console.log(answer.join('\n'));
}

const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
