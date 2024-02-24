// 아기 상어
// 1. 먹을 수 있는 물고기 개수 확인
// 2. 먹을 수 있는 최단 거리 물고기 저장
//    => 가장 가까운 물고기 => 가장 위에 있는 물고기 => 가장 왼쪽에 있는 물고기
// 3. 우선 순위가 가장 높은 물고기 먹기
// 1 ~ 3 반복

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

class PriorityQueue {
  nodes = [null];

  isEmpty() {
    return this.nodes.length === 1;
  }

  swap(idx1, idx2) {
    [this.nodes[idx1], this.nodes[idx2]] = [this.nodes[idx2], this.nodes[idx1]];
  }

  // node1 우선 순위가 더 높은 경우 true 반환
  compare(idx1, idx2) {
    // 높이가 높은 경우 우선 순위가 높음
    if (this.nodes[idx1][0] < this.nodes[idx2][0]) return true;
    // 높이가 같다면 더 왼쪽에 있는 것이 우선 순위가 높음
    if (
      this.nodes[idx1][0] === this.nodes[idx2][0] &&
      this.nodes[idx1][1] < this.nodes[idx2][1]
    )
      return true;

    return false;
  }

  enqueue(node) {
    this.nodes.push(node);

    let childIdx = this.nodes.length - 1;
    let parIdx = Math.floor(childIdx / 2);

    // 자식의 우선 순위가 부모보다 높다면 교환
    while (childIdx > 1 && this.compare(childIdx, parIdx)) {
      this.swap(childIdx, parIdx);
      childIdx = parIdx;
      parIdx = Math.floor(childIdx / 2);
    }
  }

  dequeue() {
    if (this.isEmpty()) return null;

    this.swap(1, this.nodes.length - 1);
    const maxPriority = this.nodes.pop();

    let parIdx = 1;
    let leftIdx = parIdx * 2;
    let rightIdx = leftIdx + 1;

    while (this.nodes[leftIdx]) {
      if (!this.nodes[rightIdx]) {
        if (this.compare(leftIdx, parIdx)) this.swap(leftIdx, parIdx);
        break;
      }

      const maxIdx = this.compare(leftIdx, rightIdx) ? leftIdx : rightIdx;

      if (this.compare(parIdx, maxIdx)) break;

      this.swap(parIdx, maxIdx);
      parIdx = maxIdx;
      leftIdx = parIdx * 2;
      rightIdx = leftIdx + 1;
    }

    return maxPriority;
  }
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

solve(input);

function solve(input) {
  // N: 바다 크기
  const N = +input[0];

  // sharkSize: 상어 크기
  let sharkSize = 2;
  // eatCnt: 물고기 먹은 횟수
  let eatCnt = 0;
  // sharkPosition: 상어 위치
  const sharkPosition = [-1, -1];
  // ocean: 바다 정보
  const ocean = input.slice(1, N + 1).map((row, i) =>
    row
      .trim()
      .split(' ')
      .map((data, j) => {
        const num = +data;
        if (num === 9) {
          sharkPosition[0] = i;
          sharkPosition[1] = j;
          return 0;
        }
        return num;
      })
  );
  // ans: 총 경과 시간
  let ans = 0;
  // dr: 세로 방향, dc: 가로 방향
  const dr = [-1, 0, 0, 1];
  const dc = [0, -1, 1, 0];

  while (true) {
    const pq = findFishPosition(sharkPosition[0], sharkPosition[1]);

    // 먹을 수 있는 물고기가 없는 경우
    if (pq.isEmpty()) break;

    // tr: 목표 물고기 세로 위치, tc: 목표 물고기 가로 위치, time: 필요 시간
    const [tr, tc, time] = pq.dequeue();
    [sharkPosition[0], sharkPosition[1]] = [tr, tc];
    eatCnt++;
    ocean[tr][tc] = 0;
    ans += time;

    if (sharkSize === eatCnt) {
      sharkSize++;
      eatCnt = 0;
    }
  }

  console.log(ans);

  function findFishPosition(sr, sc) {
    const visited = Array.from({ length: N }, () => Array(N).fill(false));
    visited[sr][sc] = true;
    const queue = new Queue();
    queue.enqueue([sr, sc, 0]);
    // 최단 시간에 도달할 수 있는 먹을 수 있는 물고기 위치
    const pq = new PriorityQueue();

    while (!queue.isEmpty()) {
      const [r, c, time] = queue.dequeue();

      // 최단 거리가 아닌 경우 반복 종료
      if (!pq.isEmpty() && pq.nodes[1][2] < time + 1) break;

      for (let i = 0; i < 4; i++) {
        const nr = r + dr[i];
        const nc = c + dc[i];

        // 범위를 벗어났거나 이미 확인했거나 물고기가 너무 큰 경우 패스
        if (
          nr < 0 ||
          nr >= N ||
          nc < 0 ||
          nc >= N ||
          visited[nr][nc] ||
          ocean[nr][nc] > sharkSize
        )
          continue;

        // 방문 처리
        visited[nr][nc] = true;

        // 빈 공간이거나 물고기와 상어의 크기가 같다면 이동만 가능
        if (ocean[nr][nc] === 0 || ocean[nr][nc] === sharkSize) {
          queue.enqueue([nr, nc, time + 1]);
          continue;
        }

        // 먹을 수 있는 물고기 pq 저장
        pq.enqueue([nr, nc, time + 1]);
      }
    }

    return pq;
  }
}
