// ACM Craft
class MinHeap {
  items = [null];

  isEmpty() {
    return this.items.length === 1;
  }

  swap(idx1, idx2) {
    [this.items[idx1], this.items[idx2]] = [this.items[idx2], this.items[idx1]];
  }

  compare(idx1, idx2) {
    if (this.items[idx1][1] < this.items[idx2][1]) return true;
    return false;
  }

  push(item) {
    this.items.push(item);

    let child = this.items.length - 1;
    let parent = Math.floor(child / 2);
    while (child > 1 && this.compare(child, parent)) {
      this.swap(child, parent);
      child = parent;
      parent = Math.floor(child / 2);
    }
  }

  pop() {
    if (this.isEmpty()) return null;
    this.swap(1, this.items.length - 1);
    const minItem = this.items.pop();

    let parent = 1;
    let left = parent * 2;
    let right = left + 1;
    while (this.items[left]) {
      if (!this.items[right]) {
        if (this.compare(left, parent)) this.swap(left, parent);
        break;
      }
      const minIdx = this.compare(left, right) ? left : right;
      if (this.compare(parent, minIdx)) break;
      this.swap(parent, minIdx);
      parent = minIdx;
      left = parent * 2;
      right = left + 1;
    }

    return minItem;
  }
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

solve();

function solve() {
  let T = Number(input[0]);
  let inputIdx = 0;
  const answer = [];
  while (T > 0) {
    T--;

    // N: 건물 개수, K: 건설 규칙 개수
    const [N, K] = input[inputIdx + 1].split(' ').map(Number);
    // D[i] => i + 1번 건물 건설 시간
    const D = input[inputIdx + 2].trim().split(' ').map(Number);
    // target: 목표 건물
    const target = Number(input[inputIdx + K + 3]) - 1;

    // graph[i] => i + 1번 건물을 지으면 이후 지을 수 있는 건물
    const graph = Array.from({ length: N }, () => []);
    // indegree[i] => i + 1번 건물을 짓기 위해 필요한 건물 개수
    const indegree = Array(N).fill(0);
    // 건설 규칙 저장
    input.slice(inputIdx + 3, inputIdx + K + 3).forEach((row) => {
      const [from, to] = row.split(' ').map((building) => Number(building) - 1);
      graph[from].push(to);
      indegree[to]++;
    });

    answer.push(getTime(N, D, graph, indegree, target));

    inputIdx += K + 3;
  }

  console.log(answer.join('\n'));

  // 목표 건설 시간 반환 함수
  function getTime(N, D, graph, indegree, target) {
    const buildings = new MinHeap();

    // 필수 건물이 없는 건물 짓기
    for (let i = 0; i < N; i++) {
      if (indegree[i] !== 0) continue;
      buildings.push([i, D[i]]);
    }

    while (!buildings.isEmpty()) {
      // building: 건물 번호, time: 현재 시간
      const [building, time] = buildings.pop();
      if (building === target) return time;

      graph[building].forEach((next) => {
        indegree[next]--;
        if (indegree[next] !== 0) return;
        // 필수 건물이 모두 지어진 경우 짓기
        buildings.push([next, time + D[next]]);
      });
    }
  }
}
