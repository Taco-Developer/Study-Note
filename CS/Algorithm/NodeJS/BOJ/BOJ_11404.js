// 플로이드

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

// n : 도시 개수
const n = +input[0];
// m : 버스 개수
const m = +input[1];

// graph[i][j]는 i에서 j까지 가는 비용 (간선)
// 인덱스 0번은 사용하지 않음
// 자기 자신으로 가는 비용 0으로 초기화
const graph = Array.from({ length: n + 1 }, (_, i) =>
  Array.from({ length: n + 1 }, (_, j) => (i === j ? 0 : Infinity))
);

// 간선 정보 저장
for (let i = 2; i < 2 + m; i++) {
  const [a, b, c] = input[i].trim().split(' ').map(Number);
  graph[a][b] = Math.min(graph[a][b], c);
}

// 플로이드 워셜 알고리즘
// 모든 노드에서 다른 모든 노드로 가는 최단 거리
// i에서 j로 가는 경우 k를 거쳐갈 때 비용과 비교해서 최솟값 저장
for (let k = 1; k <= n; k++) {
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = graph[i][k] + graph[k][j];
      graph[i][j] = Math.min(graph[i][j], cost);
    }
  }
}

let ans = '';
for (let i = 1; i <= n; i++) {
  ans +=
    graph[i]
      .slice(1)
      .map((num) => (num === Infinity ? 0 : num))
      .join(' ') + '\n';
}

console.log(ans.trim());
