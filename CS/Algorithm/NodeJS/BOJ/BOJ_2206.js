// 벽 부수고 이동하기
class Queue {
  items = [];
  headIdx = 0;
  tailIdx = 0;

  isEmpty() {
    return this.headIdx === this.tailIdx;
  }

  enqueue(item) {
    this.items[this.tailIdx] = item;
    this.tailIdx++;
  }

  dequeue() {
    if (this.isEmpty()) return null;

    const headItem = this.items[this.headIdx];
    this.headIdx++;

    if (this.isEmpty()) {
      this.headIdx = 0;
      this.tailIdx = 0;
    }

    return headItem;
  }
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const [N, M] = input[0].split(' ').map(Number);
const jido = [];
for (let i = 1; i <= N; i++) {
  jido.push(input[i].trim().split(''));
}
console.log(bfs());

// 시작점부터 도착점까지 이동하며 확인
function bfs() {
  // [벽을 아직 부술 수 있는 경우, 벽을 더 이상 부술 수 없는 경우]
  const visited = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => [0, 0])
  );
  const queue = new Queue();
  visited[0][0][0] = 1;
  queue.enqueue([0, 0, 0]);

  while (!queue.isEmpty()) {
    const [y, x, isBreak] = queue.dequeue();

    // 목표 지점에 도착
    if (y === N - 1 && x === M - 1) {
      return visited[N - 1][M - 1][isBreak];
    }

    for (const [dy, dx] of [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ]) {
      const ny = y + dy;
      const nx = x + dx;

      // 범위를 벗어난 경우
      if (ny < 0 || ny >= N || nx < 0 || nx >= M) continue;

      // 벽이 아니고 현재 벽을 부술 수 있는 상태와 같은 상황에서 방문한 적이 없는 경우
      // 벽을 부술 수 있는 경우엔 벽을 부술 수 있는 경우 방문 여부를 확인
      // 벽을 부술 수 없는 경우엔 벽을 부술 수 없는 경우 방문 여부 확인
      if (jido[ny][nx] === '0' && visited[ny][nx][isBreak] === 0) {
        visited[ny][nx][isBreak] = visited[y][x][isBreak] + 1;
        queue.enqueue([ny, nx, isBreak]);
        continue;
      }

      // 현재 위치가 벽이고 아직 벽을 부술 수 있는 경우
      if (jido[ny][nx] === '1' && isBreak === 0) {
        visited[ny][nx][1] = visited[y][x][0] + 1;
        queue.enqueue([ny, nx, 1]);
      }
    }
  }

  // 목표 지점 도착 실패
  return -1;
}
