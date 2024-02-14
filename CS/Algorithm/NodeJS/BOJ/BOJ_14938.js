// 서강그라운드

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

main(input);

function main(input) {
  // n: 지역 개수, m: 수색 범위, r: 길 개수
  const [n, m, r] = input[0].trim().split(' ').map(Number);

  // 각 지역의 아이템 개수
  const items = input[1].trim().split(' ').map(Number);

  const graph = [];
  for (let i = 0; i < n; i++) {
    graph.push(Array.from({ length: n }, (_, j) => (i === j ? 0 : Infinity)));
  }

  input.slice(2, r + 2).forEach((data) => {
    // a, b : 지역 번호, i: 지역간 거리
    const [a, b, i] = data.trim().split(' ').map(Number);

    // 무방향 그래프
    graph[a - 1][b - 1] = Math.min(graph[a - 1][b - 1], i);
    graph[b - 1][a - 1] = Math.min(graph[b - 1][a - 1], i);
  });

  // 위치별 최단 거리 구하기
  getMinDistance(n, graph);

  let ans = 0;

  // 각 위치에서 얻을 수 있는 아이템 개수 최댓값 저장
  for (let i = 0; i < n; i++) {
    let temp = 0;
    graph[i].forEach((distance, idx) => {
      if (distance <= m) temp += items[idx];
    });

    ans = Math.max(ans, temp);
  }

  console.log(ans);
}

// 위치별 최단 거리 구하는 함수
function getMinDistance(n, graph) {
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const distance = graph[i][k] + graph[k][j];
        graph[i][j] = Math.min(graph[i][j], distance);
      }
    }
  }
}
