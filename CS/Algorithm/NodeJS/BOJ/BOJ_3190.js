function solution(input) {
  class Queue {
    items = [];
    headIdx = 0;
    tailidx = 0;

    isEmpty() {
      return this.headIdx === this.tailidx;
    }

    push(item) {
      this.items[this.tailidx++] = item;
    }

    popLeft() {
      if (this.isEmpty()) return null;

      const item = this.items[this.headIdx++];

      if (this.isEmpty()) {
        this.headIdx = 0;
        this.tailidx = 0;
      }

      return item;
    }

    getBack() {
      return this.isEmpty() ? null : this.items[this.tailidx - 1];
    }
  }

  // N: 보드의 크기, K: 사과의 개수
  const N = +input[0];
  const K = +input[1];
  const L = +input[K + 2];

  // 0: 비었음, 1: 사과, 2: 뱀
  const board = Array.from({ length: N }, () => Array(N).fill(0));
  for (let i = 2; i < K + 2; i++) {
    const [appleY, appleX] = input[i].split(' ').map(Number);
    board[appleY - 1][appleX - 1] = 1;
  }

  // L: 왼쪽 전환, D: 오른쪽 전환
  const turnTime = [];
  for (let i = K + 3; i < K + L + 3; i++) {
    const [time, direction] = input[i].split(' ');
    turnTime[+time] = direction;
  }

  // nowDirection: 현재 진행 방향
  let nowDirection = 1;
  // 상, 우, 하, 좌
  const dy = [-1, 0, 1, 0];
  const dx = [0, 1, 0, -1];

  const snake = new Queue();
  snake.push([0, 0]);
  let answer = 0;

  while (true) {
    answer++;

    // 현재 머리 위치
    const [headY, headX] = snake.getBack();

    // 다음 머리 위치
    const nHeadY = headY + dy[nowDirection];
    const nHeadX = headX + dx[nowDirection];

    // 벽이거나 뱀이 있는 경우 종료
    if (
      nHeadY < 0 ||
      nHeadY >= N ||
      nHeadX < 0 ||
      nHeadX >= N ||
      board[nHeadY][nHeadX] === 2
    )
      break;

    // 사과가 아닌 경우 꼬리 당기기
    if (board[nHeadY][nHeadX] === 0) {
      const [tailY, tailX] = snake.popLeft();
      board[tailY][tailX] = 0;
    }

    // 머리 위치 업데이트
    board[nHeadY][nHeadX] = 2;
    snake.push([nHeadY, nHeadX]);

    // 방향 전환
    if (turnTime[answer] === 'L')
      nowDirection = nowDirection === 0 ? 3 : nowDirection - 1;
    else if (turnTime[answer] === 'D') nowDirection = (nowDirection + 1) % 4;
  }

  return answer;
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');
console.log(solution(input));
