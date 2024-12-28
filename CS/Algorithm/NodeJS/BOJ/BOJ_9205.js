class Queue {
  nodes = [];
  headIdx = 0;
  tailIdx = 0;

  isEmpty() {
    return this.headIdx === this.tailIdx;
  }

  push(node) {
    this.nodes[this.tailIdx++] = node;
  }

  pop() {
    if (this.isEmpty()) return null;
    return this.nodes[this.headIdx++];
  }
}

function solution(input) {
  let inputIdx = 0;
  const t = +input[inputIdx++];
  const answer = [];

  for (let testNum = 0; testNum < t; testNum++) {
    const n = +input[inputIdx++];

    // 각 위치의 좌표를 저장 (0: 집, n+1: 페스티벌, 그 외: 편의점)
    const positions = [];

    for (let i = 0; i < n + 2; i++) {
      const [x, y] = input[inputIdx++].split(' ');
      positions.push([+x, +y]);
    }

    // 각 좌표에서 갈 수 있는 곳 저장 (graph[i] => i에서 갈 수 있는 곳)
    const graph = Array.from({ length: n + 2 }, () => []);
    for (let i = 0; i < n + 1; i++) {
      for (let j = i + 1; j < n + 2; j++) {
        const distance =
          Math.abs(positions[i][0] - positions[j][0]) +
          Math.abs(positions[i][1] - positions[j][1]);

        // 맥주 20병으로 갈 수 있는 최대 거리는 1000
        if (distance > 1000) continue;

        graph[i].push(j);
        graph[j].push(i);
      }
    }

    // 집에서 출발(BFS)
    let isHappy = false;
    const visited = Array(n + 2).fill(0);
    const queue = new Queue();

    visited[0] = 1;
    queue.push(0);

    while (!queue.isEmpty()) {
      const positionIdx = queue.pop();

      // 페스티벌 도착
      if (positionIdx === n + 1) {
        isHappy = true;
        break;
      }

      // 현재 위치에서 갈 수 있는 곳 확인(이미 방문한 곳 제외)
      for (const nextPositionIdx of graph[positionIdx]) {
        if (visited[nextPositionIdx]) continue;
        visited[nextPositionIdx] = 1;
        queue.push(nextPositionIdx);
      }
    }

    answer.push(isHappy ? 'happy' : 'sad');
  }

  console.log(answer.join('\n'));
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath, 'utf-8').toString().trim().split('\n');

solution(input);
