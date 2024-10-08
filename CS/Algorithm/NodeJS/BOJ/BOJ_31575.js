class Queue {
  items = [];
  headIdx = 0;
  tailIdx = 0;

  isEmpty() {
    return this.headIdx === this.tailIdx;
  }

  add(item) {
    this.items[this.tailIdx++] = item;
  }

  remove() {
    return this.items[this.headIdx++];
  }
}

function solution(input) {
  const [N, M] = input[0].split(' ').map(Number);

  // 도시 정보
  const city = [];
  for (let i = 1; i <= M; i++) {
    city.push(input[i].trim().split(' '));
  }

  // 방향
  const dy = [0, 1];
  const dx = [1, 0];

  // BFS
  const queue = new Queue();
  const visited = Array.from({ length: M }, () => Array(N).fill(false));

  queue.add([0, 0]);
  visited[0][0] = true;

  while (!queue.isEmpty()) {
    // 현재 위치
    const [y, x] = queue.remove();

    // 목적지 도달
    if (y === M - 1 && x === N - 1) {
      console.log('Yes');
      return;
    }

    // 이동
    for (let i = 0; i < 2; i++) {
      const ny = y + dy[i];
      const nx = x + dx[i];

      // 도시를 벗어나거나 갈 수 없거나 방문했거나
      if (ny >= M || nx >= N || city[ny][nx] !== '1' || visited[ny][nx])
        continue;

      // 방문 표시 후 queue 추가
      visited[ny][nx] = true;
      queue.add([ny, nx]);
    }
  }

  console.log('No');
}
const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
