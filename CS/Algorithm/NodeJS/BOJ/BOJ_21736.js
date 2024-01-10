class Queue {
  items = [];
  headIndex = 0;
  tailIndex = 0;

  enqueue(item) {
    this.items[this.tailIndex] = item;
    this.tailIndex++;
  }

  dequeue() {
    // 큐가 비었으면 null 반환
    if (this.isEmpty()) return null;

    // 뽑아낼 아이템
    const headItem = this.items[this.headIndex];
    // 인덱스 수정
    this.headIndex++;

    // 큐가 비었다면 headIndex, tailIndex 초기화
    if (this.isEmpty()) {
      this.headIndex = 0;
      this.tailIndex = 0;
    }

    // 뽑아낸 아이템 반환
    return headItem;
  }

  isEmpty() {
    return this.headIndex === this.tailIndex;
  }
}

// 입력
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

// N: 세로 길이, M: 가로 길이
const [N, M] = input[0].split(' ').map((num) => +num);

// 대학 캠퍼스 정보
const campus = [];

// 도연이의 현재 위치 = [y, x]
const start = [-1, -1];

// 캠퍼스 정보 저장
for (let i = 0; i < N; i++) {
  campus.push(
    Array.from({ length: M }, (_, j) => {
      // 도연이 위치 저장
      if (input[i + 1][j] === 'I') {
        start[0] = i;
        start[1] = j;
      }
      return input[i + 1][j];
    })
  );
}

// 방향
const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];

// queue
const queue = new Queue();

// 방문 정보
const visited = Array.from({ length: N }, () => Array(M).fill(0));

// 시작 위치 삽입(도연 위치) 및 방문 처리
queue.enqueue(start);
visited[start[0]][start[1]] = 1;

// 정답
let ans = 0;

while (!queue.isEmpty()) {
  // 뽑아낸 위치에서 상, 하, 좌, 우 확인
  const [y, x] = queue.dequeue();

  // 사람을 만나면 카운트
  if (campus[y][x] === 'P') ans++;

  for (let i = 0; i < 4; i++) {
    const ny = y + dy[i];
    const nx = x + dx[i];

    // 범위를 벗어났거나 벽이거나 이미 방문한 위치라면 다음 위치로 넘어감
    if (
      ny < 0 ||
      ny >= N ||
      nx < 0 ||
      nx >= M ||
      campus[ny][nx] === 'X' ||
      visited[ny][nx] !== 0
    )
      continue;

    // 방문 처리
    visited[ny][nx] = 1;
    // 다음 위치 방문을 위해 queue에 삽입
    queue.enqueue([ny, nx]);
  }
}

console.log(ans === 0 ? 'TT' : ans);
