// Queue
class Queue {
  items = [];
  headIndex = 0; // 이번에 꺼낼 item 위치
  tailIndex = 0; // 이번에 들어갈 item 위치 (headIndex와 tailIndex가 같다면 items가 비었단 의미)

  // item 삽입
  enqueue(item) {
    if (this.isEmpty()) {
      this.headIndex = 0;
      this.tailIndex = 0;
    }

    this.items[this.tailIndex] = item;
    this.tailIndex++;
  }

  // item 삭제 (반환)
  dequeue() {
    if (this.isEmpty()) return null;

    const headItem = this.items[this.headIndex];
    this.headIndex++;

    return headItem;
  }

  // 비었는지 여부
  isEmpty() {
    return this.tailIndex - this.headIndex === 0;
  }
}

// 시작 위치 찾는 함수
function findTarget(mapData) {
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < m; x++) {
      if (mapData[y][x] === 2) {
        return [y, x];
      }
    }
  }
}

// 위치별 최단 거리 저장 함수 (목표점에서 각 위치로 이동)
function bfs(target, noWay, n, m, mapData) {
  // 방문할 위치를 저장할 queue
  const queue = new Queue();
  queue.enqueue([target[0], target[1]]);

  // 방문 처리 정보 초기화 (목표와의 거리)
  const visited = Array.from({ length: n }, () => Array(m).fill(-1));
  visited[target[0]][target[1]] = 0;
  // 처음부터 방문할 수 없는 위치 체크
  noWay.forEach(([y, x]) => {
    visited[y][x] = 0;
  });

  // 방향
  const dy = [-1, 1, 0, 0];
  const dx = [0, 0, -1, 1];

  // queue가 비어있는 경우(방문할 곳이 없음)까지 반복
  while (!queue.isEmpty()) {
    // 현재 위치
    const [y, x] = queue.dequeue();

    // 상, 하, 좌, 우 확인
    for (let i = 0; i < 4; i++) {
      const ny = y + dy[i];
      const nx = x + dx[i];

      // 지도 범위를 벗어났거나 이미 방문한 경우
      if (ny < 0 || ny >= n || nx < 0 || nx >= m || visited[ny][nx] !== -1) {
        continue;
      }

      // 방문 처리 (거리 저장)
      visited[ny][nx] = visited[y][x] + 1;
      // 다음 위치 방문을 위한 queue 삽입
      queue.enqueue([ny, nx]);
    }
  }

  return visited;
}

// 입력
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

// n: 세로 크기, m: 가로 크기
const [n, m] = input[0].split(' ').map((num) => +num);

// 지도 정보
const mapData = Array(n);
const noWay = [];
for (let i = 0; i < n; i++) {
  const line = input[i + 1].split(' ').map((num) => +num);
  mapData[i] = Array.from({ length: m }, (_, j) => {
    if (line[j] === 0) noWay.push([i, j]);
    return line[j];
  });
}

// 목표 지점
const target = findTarget(mapData);

// 정답
const ans = bfs(target, noWay, n, m, mapData);

// 출력
for (let i = 0; i < n; i++) {
  console.log(ans[i].join(' '));
}
