function solution(input) {
  const [V, E] = input[0].split(' ').map(Number);

  // graph[start][end]: start에서 end까지 최단 거리
  const graph = [];
  for (let i = 0; i < V; i++) {
    graph.push(Array.from({ length: V }, (_, j) => (i === j ? 0 : Infinity)));
  }

  // 간선 정보 저장
  for (let i = 1; i <= E; i++) {
    const [a, b, c] = input[i].split(' ').map(Number);
    graph[a - 1][b - 1] = c;
  }

  // 최단 거리 저장
  for (let mid = 0; mid < V; mid++) {
    for (let start = 0; start < V; start++) {
      for (let end = 0; end < V; end++) {
        graph[start][end] = Math.min(
          graph[start][end],
          graph[start][mid] + graph[mid][end]
        );
      }
    }
  }

  // 최단 사이클 찾기
  let answer = Infinity;
  for (let start = 0; start < V - 1; start++) {
    for (let end = start + 1; end < V; end++) {
      // 사이클 없는 경우 패스
      if (graph[start][end] === Infinity || graph[end][start] === Infinity)
        continue;

      answer = Math.min(answer, graph[start][end] + graph[end][start]);
    }
  }

  console.log(answer === Infinity ? -1 : answer);
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');
solution(input);
