class Queue {
  nodes = [];
  headIdx = 0;
  tailIdx = 0;

  isEmpty() {
    return this.headIdx === this.tailIdx;
  }

  push(node) {
    this.nodes[this.tailIdx++] = node;
  }

  pop() {
    if (this.isEmpty()) return null;
    return this.nodes[this.headIdx++];
  }
}

function solution(input) {
  let inputIdx = 0;
  const answer = [];

  while (true) {
    // L: 층, R: 행, C: 열
    const [L, R, C] = input[inputIdx++].split(' ').map(Number);
    if (L === 0 && R === 0 && C === 0) break;

    // S: 시작 위치, E: 탈출 위치
    const S = [-1, -1, -1];
    const E = [-1, -1, -1];

    const buildings = [];
    for (let l = 0; l < L; l++) {
      const floor = [];
      for (let r = 0; r < R; r++) {
        floor[r] = input[inputIdx++].trim();

        // 시작 위치와 탈출 위치를 찾은 경우 반복 실행하지 않음
        if (S[0] !== -1 && E[0] !== -1) continue;

        // 시작 위치, 탈출 위치 찾기
        for (let c = 0; c < C; c++) {
          if (floor[r][c] === 'S') {
            [S[0], S[1], S[2]] = [l, r, c];
          } else if (floor[r][c] === 'E') {
            [E[0], E[1], E[2]] = [l, r, c];
          }
        }
      }

      buildings[l] = floor;
      inputIdx++;
    }

    // 위, 아래, 상, 하, 좌, 우
    const directions = [
      [-1, 0, 0],
      [1, 0, 0],
      [0, -1, 0],
      [0, 1, 0],
      [0, 0, -1],
      [0, 0, 1],
    ];

    // 방문 정보(몇초에 방문하는지, -1 === 방문하지 않음)
    const visited = Array.from({ length: L }, () =>
      Array.from({ length: R }, () => Array(C).fill(-1))
    );
    const queue = new Queue();

    // 시작 위치에서 출발
    visited[S[0]][S[1]][S[2]] = 0;
    queue.push(S);

    while (!queue.isEmpty()) {
      const [l, r, c] = queue.pop();

      // 탈출 지점 도달
      if (E[0] === l && E[1] === r && E[2] === c) break;

      // 위, 아래, 상, 하, 좌, 우 확인
      for (let i = 0; i < 6; i++) {
        const nl = l + directions[i][0];
        const nr = r + directions[i][1];
        const nc = c + directions[i][2];

        // 범위 벗어남
        if (nl < 0 || nl >= L || nr < 0 || nr >= R || nc < 0 || nc >= C)
          continue;
        // 막혔거나 이미 방문함
        if (buildings[nl][nr][nc] === '#' || visited[nl][nr][nc] !== -1)
          continue;

        // 방문 처리
        visited[nl][nr][nc] = visited[l][r][c] + 1;
        queue.push([nl, nr, nc]);
      }
    }

    answer.push(
      visited[E[0]][E[1]][E[2]] !== -1
        ? `Escaped in ${visited[E[0]][E[1]][E[2]]} minute(s).`
        : 'Trapped!'
    );
  }

  console.log(answer.join('\n'));
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath, 'utf-8').toString().trim().split('\n');

solution(input);
