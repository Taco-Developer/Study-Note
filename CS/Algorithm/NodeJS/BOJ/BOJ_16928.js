// Queue
class Queue {
  items = [];
  headIndex = 0;
  tailIndex = 0;

  isEmpty() {
    return this.headIndex === this.tailIndex;
  }

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
}

// 입력
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

// N: 사다리 개수, M: 뱀 개수
const [N, M] = input[0]
  .trim()
  .split(' ')
  .map((num) => +num);

// 게임판 [번호, 사다리 또는 뱀 존재 여부, 최초 방문 순서]
const gamePan = Array.from({ length: 101 }, (_, j) => [j, false, 0]);

// 사다리, 뱀 정보 저장하는 함수
function saveMove(i, gamePan, moveMap) {
  const [start, end] = input[i]
    .trim()
    .split(' ')
    .map((num) => +num);
  // 사다리, 뱀 여부 수정
  gamePan[start][1] = true;
  // 사다리와 뱀 시작 위치, 도착 위치 저장
  moveMap[start] = end;
}

// 사다리, 뱀 정보 {key: 뱀 또는 사다리 시작 위치, value: 도착 위치}
const moveMap = {};
// 사다리 저장
for (let i = 1; i <= N; i++) {
  saveMove(i, gamePan, moveMap);
}
// 뱀 저장
for (let i = N + 1; i <= N + M; i++) {
  saveMove(i, gamePan, moveMap);
}

// 1번에서 주사위를 굴리면서 도착하면 순서 저장
function bfs(gamePan, moveMap) {
  const queue = new Queue();
  queue.enqueue(1);

  while (!queue.isEmpty()) {
    const now = queue.dequeue();

    if (now === 100) return;

    for (let num = 1; num <= 6; num++) {
      let next = now + num;

      // 게임판 범위를 벗어나면 이후 더 높은 주사위 숫자는 의미 없음
      if (next > 100) break;

      // 사다리나 뱀이 있는 경우 이동
      if (gamePan[next][1]) {
        next = moveMap[next];
      }

      // 최종 이동 지점이 이전에 방문했더라면 다음 반복 실행
      if (gamePan[next][2] !== 0) continue;

      // 순서 저장 및 방문 처리
      gamePan[next][2] = gamePan[now][2] + 1;
      queue.enqueue(next);
    }
  }
}

bfs(gamePan, moveMap);

// 출력
console.log(gamePan[100][2]);
