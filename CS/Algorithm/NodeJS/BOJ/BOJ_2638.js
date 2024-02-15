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

main(input);

function main(input) {
  // N: 세로 길이, M: 가로 길이
  const [N, M] = input[0].trim().split(' ').map(Number);

  // 모눈 종이
  // paper[i][j] < 0 외부 공기, == 0 내부 공기, >= 3 외부 공기와 접촉면 2 이상
  const paper = input
    .slice(1, N + 1)
    .map((row) => row.trim().split(' ').map(Number));

  // 상하좌우 방향 전환
  const dir = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  let ans = 0;

  let checkedCheese = checkAirAndCheese(0, 0);

  while (checkedCheese.length > 0) {
    ans++;
    checkedCheese = removeAndCheck(checkedCheese);
  }

  console.log(ans);

  // 사라질 치즈를 확인하는 함수
  function checkAirAndCheese(sy, sx) {
    const queue = new Queue();
    paper[sy][sx] = -1;
    queue.enqueue([sy, sx]);

    // 사라질 치즈
    const checked = [];

    while (!queue.isEmpty()) {
      const [y, x] = queue.dequeue();
      dir.forEach(([dy, dx]) => {
        const ny = y + dy;
        const nx = x + dx;

        // 모눈 종이 범위를 벗어나거나 이미 외부 공기인 부분 생략
        if (ny < 0 || ny >= N || nx < 0 || nx >= M || paper[ny][nx] < 0) return;

        // 외부 공기 체크 (외부 공기에서 시작해서 도착할 수 있는 공기는 무조건 외부 공기)
        if (paper[ny][nx] === 0) {
          paper[ny][nx] = -1;
          queue.enqueue([ny, nx]);
          return;
        }

        // 공기가 아니라면 치즈이므로 현재 공기와 닿아있으므로 + 1
        paper[ny][nx] += 1;
        // 만약 값이 3이 되는 경우 외부 공기와 2군데 이상 닿은 것이므로 사라질 치즈
        if (paper[ny][nx] === 3) checked.push([ny, nx]);
      });
    }

    // 사라질 치즈 위치 반환
    return checked;
  }

  // 확인된 치즈를 지우고 다음으로 사라질 치즈 확인
  function removeAndCheck(checkedCheese) {
    const temp = [];
    checkedCheese.forEach(([y, x]) => {
      temp.push(...checkAirAndCheese(y, x));
    });
    return temp;
  }
}
