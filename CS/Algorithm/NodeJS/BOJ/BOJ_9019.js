// Queue
class Queue {
  items = [];
  headIndex = 0;
  tailIndex = 0;

  isEmpty() {}

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

// 계산기 [계산 결과, 실행된 명령어] 반환
class Calc {
  // D 계산
  static D(n, cmd) {
    return [(2 * n) % 10000, cmd + 'D'];
  }

  // S 계산
  static S(n, cmd) {
    return [(n + 9999) % 10000, cmd + 'S'];
  }

  // L 계산
  static L(n, cmd) {
    return [(n % 1000) * 10 + Math.floor(n / 1000), cmd + 'L'];
  }

  // R 계산
  static R(n, cmd) {
    return [(n % 10) * 1000 + Math.floor(n / 10), cmd + 'R'];
  }
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

// 전체 테스트 케이스 수
const T = +input[0];

// 정답
const ans = Array(T);

// 계산기 - 반복을 위해 배열로 저장
const calcs = [Calc.D, Calc.S, Calc.L, Calc.R];

// 테스트 케이스 진행
for (let t = 0; t < T; t++) {
  const [A, B] = input[t + 1]
    .trim()
    .split(' ')
    .map((num) => +num);

  // Queue
  const queue = new Queue();
  // 방문 처리 배열
  const visited = [];
  for (let i = 0; i < 10000; i++) {
    visited[i] = 0;
  }
  // 시작 위치 방문 처리 및 enqueue
  visited[A] = 1;
  queue.enqueue([A, '']);

  // 너비 우선 탐색 시작
  while (!queue.isEmpty()) {
    // [현재 수, 지금까지 실행된 명령어]
    const [num, cmd] = queue.dequeue();

    // 목표 수에 도달하면 정답 배열에 저장 후 종료
    if (num === B) {
      ans[t] = cmd;
      break;
    }

    // D, S, L, R 순서로 계산
    for (let i = 0; i < 4; i++) {
      const [nextNum, nextCmd] = calcs[i](num, cmd);

      // 계산 결과가 이전에 나왔던 수라면 다음 계산으로 이동
      if (visited[nextNum]) continue;

      // 처음 나온 수라면 방문 처리 및 enqueue
      visited[nextNum] = 1;
      queue.enqueue([nextNum, nextCmd]);
    }
  }
}

// 출력
console.log(ans.join('\n'));
