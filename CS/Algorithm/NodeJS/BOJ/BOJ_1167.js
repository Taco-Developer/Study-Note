// 트리의 지름

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

// 정점의 개수
const V = +input[0];

// tree
const tree = Array.from({ length: V }, () => []);
// 간선 정보 저장
for (let i = 1; i <= V; i++) {
  const [v, ...data] = input[i].trim().split(' ').map(Number);
  for (let j = 0; j < data.length; j += 2) {
    const w = data[j];
    const distance = data[j + 1];

    if (w === -1) continue;

    tree[v - 1].push([w - 1, distance]);
  }
}

// 방문 정보
let visited = Array(V).fill(0);
visited[0] = 1;
// 0에서 가장 멀리있는 노드 찾기
let endNode = 0;
findMaxDistance(0);

// 한 점에서 가장 멀리있는 점을 찾는 함수
// 임의의 점 하나에서 가장 멀리있는 점은 지름을 이루는 양 끝 점 중 무조건 하나에 해당
// 만약 시작 점이 지름 중 하나라면 다른 끝 점이 나오고 내부에 있는 점이라면 멀리 있는 끝 점이 나옴
function findMaxDistance(v) {
  for (const [w, distance] of tree[v]) {
    if (visited[w]) continue;
    visited[w] = visited[v] + distance;
    endNode = visited[endNode] >= visited[w] ? endNode : w;
    findMaxDistance(w);
  }
}

// 방문 정보 초기화
visited = Array(V).fill(0);
visited[endNode] = 1;
// 시작 위치를 찾은 endNode로 변경 후 다시 endNode를 찾음
// 지름 한 끝 점에서 가장 깊은 곳이 다른 한 끝 점
findMaxDistance(endNode);

console.log(visited[endNode] - 1);
