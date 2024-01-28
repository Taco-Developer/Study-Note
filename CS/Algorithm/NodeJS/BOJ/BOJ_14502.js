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

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

// N : 세로 길이, M : 가로 길이
const [N, M] = input[0].trim().split(' ').map(Number);

// solve 1
// // 지도
// const jido = [];
// // 시작 바이러스 위치
// const startVirus = [];
// // 최대 안전 구역 크기 (벽 3개를 무조건 세워야하므로 -3으로 초기화)
// let maxSafeArea = -3;

// for (let i = 0; i < N; i++) {
//   const row = input[i + 1].trim().split(' ');

//   for (let j = 0; j < M; j++) {
//     // 바이러스 위치 저장
//     if (row[j] === '2') {
//       startVirus.push([i, j]);
//     }
//     // 안전 구역 개수 카운트
//     else if (row[j] === '0') {
//       maxSafeArea++;
//     }
//   }

//   jido.push(row);
// }

// // 3개의 벽 중 첫 번째 벽으로 선택 여부
// const firstSelected = Array.from({ length: N }, () => Array(M).fill(0));

// // 안전 구역 개수
// let ans = 0;

// // 벽 세우기
// selectWall(0);

// // 벽을 세우는 함수
// function selectWall(cnt) {
//   // 이미 최댓값이면 종료
//   if (ans === maxSafeArea) return;

//   // 벽 3개를 골랐다면 안전구역 확인
//   if (cnt === 3) {
//     spreadVirus(startVirus);
//     return;
//   }

//   // 벽 선택
//   for (let y = 0; y < N; y++) {
//     for (let x = 0; x < M; x++) {
//       // 비었고 첫 번째 벽으로 선택되지 않았다면 선택
//       if (jido[y][x] === '0' && firstSelected[y][x] === 0) {
//         // 첫 번째 벽으로 선택하는 경우 체크
//         if (cnt === 0) firstSelected[y][x]++;

//         // 벽 세우기
//         jido[y][x] = '1';
//         selectWall(cnt + 1);
//         // 벽 지우기
//         jido[y][x] = '0';
//       }
//     }
//   }
// }

// // 바이러스 퍼뜨리기
// function spreadVirus(virus) {
//   const queue = new Queue();
//   // 바이러스가 이미 퍼졌는지 여부
//   const visited = Array.from({ length: N }, () => Array(M).fill(0));

//   // 바이러스 위치 enque 및 방문 처리
//   for (let i = 0; i < virus.length; i++) {
//     queue.enqueue([virus[i][0], virus[i][1]]);
//     visited[virus[i][0]][virus[i][1]]++;
//   }

//   // 바이러스가 추가로 퍼진 횟수
//   let cnt = 0;

//   while (!queue.isEmpty()) {
//     const [y, x] = queue.dequeue();

//     // 상, 하, 좌, 우
//     for (const [dy, dx] of [
//       [-1, 0],
//       [1, 0],
//       [0, -1],
//       [0, 1],
//     ]) {
//       const ny = y + dy;
//       const nx = x + dx;

//       // 범위를 벗어나거나 방문했거나 빈 공간이 아닌 경우 다음 반복으로 넘어감
//       if (
//         ny < 0 ||
//         ny >= N ||
//         nx < 0 ||
//         nx >= M ||
//         visited[ny][nx] !== 0 ||
//         jido[ny][nx] !== '0'
//       )
//         continue;

//       // enque, 방문 처리, 카운트
//       queue.enqueue([ny, nx]);
//       visited[ny][nx]++;
//       cnt++;

//       // 안전 공간 크기가 이전보다 작아지면 종료
//       if (maxSafeArea - cnt <= ans) return;
//     }
//   }

//   ans = maxSafeArea - cnt;
// }

// console.log(ans);

// solve 2 -- 빈 공간을 저장하고 거기서 3개의 벽을 선택
// 지도
const jido = [];
// virus
const virus = [];
// 빈 공간
const emptySpace = [];

for (let i = 0; i < N; i++) {
  const data = input[i + 1].trim().split(' ');

  data.forEach((num, idx) => {
    if (num === '0') {
      emptySpace.push([i, idx]);
    } else if (num === '2') {
      virus.push([i, idx]);
    }
  });

  jido.push(data);
}

let ans = 0;
const maxSafeArea = emptySpace.length - 3;

selectWall();

function selectWall() {
  for (let i = 0; i < emptySpace.length; i++) {
    // 첫 번째 벽
    jido[emptySpace[i][0]][emptySpace[i][1]] = '1';
    for (let j = i + 1; j < emptySpace.length; j++) {
      // 두 번째 벽
      jido[emptySpace[j][0]][emptySpace[j][1]] = '1';
      for (let k = j + 1; k < emptySpace.length; k++) {
        // 세 번째 벽
        jido[emptySpace[k][0]][emptySpace[k][1]] = '1';
        // 바이러스 퍼뜨리기
        spreadVirus();
        jido[emptySpace[k][0]][emptySpace[k][1]] = '0';
      }
      jido[emptySpace[j][0]][emptySpace[j][1]] = '0';
    }
    jido[emptySpace[i][0]][emptySpace[i][1]] = '0';
  }
}

// 바이러스 퍼뜨리기
function spreadVirus() {
  // 이미 안전구역 크기가 최댓값이면 종료
  if (ans === maxSafeArea) return;

  const queue = new Queue();
  // 바이러스가 이미 퍼졌는지 여부
  const visited = Array.from({ length: N }, () => Array(M).fill(0));

  // 바이러스 위치 enque 및 방문 처리
  for (let i = 0; i < virus.length; i++) {
    queue.enqueue([virus[i][0], virus[i][1]]);
    visited[virus[i][0]][virus[i][1]]++;
  }

  // 바이러스가 추가로 퍼진 횟수
  let cnt = 0;

  while (!queue.isEmpty()) {
    const [y, x] = queue.dequeue();

    // 상, 하, 좌, 우
    for (const [dy, dx] of [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ]) {
      const ny = y + dy;
      const nx = x + dx;

      // 범위를 벗어나거나 방문했거나 빈 공간이 아닌 경우 다음 반복으로 넘어감
      if (
        ny < 0 ||
        ny >= N ||
        nx < 0 ||
        nx >= M ||
        visited[ny][nx] !== 0 ||
        jido[ny][nx] !== '0'
      )
        continue;

      // enque, 방문 처리, 카운트
      queue.enqueue([ny, nx]);
      visited[ny][nx]++;
      cnt++;

      // 안전 공간 크기가 이전보다 작아지면 종료
      if (maxSafeArea - cnt <= ans) return;
    }
  }

  ans = maxSafeArea - cnt;
}

console.log(ans);
