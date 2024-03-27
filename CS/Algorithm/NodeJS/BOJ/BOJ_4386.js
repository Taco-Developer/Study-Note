// 별자리 만들기
class MinHeap {
  items = [null];

  isEmpty() {
    return this.items.length === 1;
  }

  swap(idx1, idx2) {
    [this.items[idx1], this.items[idx2]] = [this.items[idx2], this.items[idx1]];
  }

  compare(idx1, idx2) {
    if (this.items[idx1][2] < this.items[idx2][2]) return true;
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
        if (this.compare(left, parent)) {
          this.swap(left, parent);
        }
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
  // n: 별의 개수
  const n = Number(input[0]);
  // stars[i] => i + 1번 별의 위치
  const stars = input.slice(1, n + 1).map((row) => row.split(' ').map(Number));

  // parents[i] => i + 1번 별의 부모
  const parents = [];
  for (let i = 0; i < n; i++) {
    parents.push(i);
  }

  // 간선 생성
  // edges => 거리가 가장 짧은 배열이 루트 위치
  const edges = new MinHeap();
  for (let i = 0; i < n - 1; i++) {
    const start1 = stars[i];
    for (let j = i + 1; j < n; j++) {
      const star2 = stars[j];
      edges.push([i, j, getDistance(start1, star2)]);
    }
  }

  let answer = 0;
  // 간선 연결 개수 => N - 1개가 되면 종료
  let cnt = 0;
  while (cnt < n - 1 && !edges.isEmpty()) {
    const [star1, star2, distance] = edges.pop();

    const star1Parent = findParent(star1);
    const star2PArent = findParent(star2);

    // 부모가 같다면 연결하면 사이클이 생김
    if (star1Parent === star2PArent) continue;

    union(star1Parent, star2PArent);
    answer += distance;
    cnt++;
  }

  console.log(answer.toFixed(2));

  // 두 별 사이 거리를 찾는 함수
  function getDistance(star1, star2) {
    const width = Math.abs(star1[0] - star2[0]);
    const height = Math.abs(star1[1] - star2[1]);
    return Math.sqrt(width ** 2 + height ** 2);
  }

  // 별의 부모를 찾는 함수
  function findParent(star) {
    if (parents[star] === star) return star;
    parents[star] = findParent(parents[star]);
    return parents[star];
  }

  // 두 별의 부모를 연결(두 별을 연결)
  function union(star1Parent, star2Parent) {
    if (star1Parent < star2Parent) {
      parents[star2Parent] = star1Parent;
    } else {
      parents[star1Parent] = star2Parent;
    }
  }
}
