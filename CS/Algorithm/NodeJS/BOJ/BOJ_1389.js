// Queue
class Queue {
  items = [];
  headIndex = 0;
  tailIndex = 0;

  enqueue(item) {
    this.items[this.tailIndex] = item;
    this.tailIndex++;
  }

  dequeue() {
    if (this.isEmpty()) return null;

    const headItem = this.items[this.headIndex];
    this.headIndex++;

    if (this.isEmpty()) {
      this.headIndex = 0;
      this.tailIndex = 0;
    }

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

// N: 유저 수, M: 관계 수
const [N, M] = input[0]
  .trim()
  .split(' ')
  .map((num) => +num);

// 관계 데이터
const adj = Array.from({ length: N + 1 }, () => Array(N + 1).fill(0));

for (let i = 0; i < M; i++) {
  const [A, B] = input[i + 1]
    .trim()
    .split(' ')
    .map((num) => +num);

  adj[A][B] = 1;
  adj[B][A] = 1;
}

// 각 유저의 케빈 베이컨 수를 저장 (초기화)
const results = Array(N + 1).fill(0);

// 1번 유저부터 N번 유저까지 케빈 베이컨 수를 찾아서 저장
for (let start = 1; start < N + 1; start++) {
  const queue = new Queue();

  // 방문 처리 배열 초기화 및 시작점 방문 불가 표시
  const visited = Array(N + 1).fill(0);
  visited[start] = -1;

  // 시작점에서 바로 갈 수 있는 부분 체크 및 enqueue
  for (let i = 1; i < N + 1; i++) {
    // 관계가 있으면 방문 처리 및 enqueue
    if (adj[start][i]) {
      visited[i] = 1;
      queue.enqueue(i);
    }
  }

  while (!queue.isEmpty()) {
    // 현재 유저
    const now = queue.dequeue();

    // 1번 유저부터 N번 유저까지 확인
    for (let i = 1; i < N + 1; i++) {
      // 현재 유저와 관계가 없거나 시작 유저와 관계가 이미 있다면 다음 유저 확인
      if (adj[now][i] === 0 || visited[i] !== 0) continue;

      // 방문 처리
      visited[i] = visited[now] + 1;
      // enqueue
      queue.enqueue(i);
    }
  }

  // 모든 케빈 베이커 더하기 (본인 위치 값이 -1 이므로 마지막에 + 1)
  for (let i = 1; i < N + 1; i++) {
    results[start] += visited[i];
  }
  results[start] += 1;
}

// 최소값과 유저 찾기
const ans = [10000, 101];
for (let i = 1; i < N + 1; i++) {
  if (ans[0] <= results[i]) continue;
  ans[0] = results[i];
  ans[1] = i;
}

// 출력
console.log(ans[1]);
