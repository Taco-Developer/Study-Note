function solution(input) {
  class Queue {
    items = [];
    headIdx = 0;
    tailIdx = 0;

    isEmpty() {
      return this.headIdx === this.tailIdx;
    }

    push(item) {
      this.items[this.tailIdx++] = item;
    }

    pop() {
      if (this.isEmpty()) return null;

      const item = this.items[this.headIdx++];

      if (this.isEmpty()) {
        this.headIdx = 0;
        this.tailIdx = 0;
      }

      return item;
    }
  }

  const bfs = (V, graph, start, visited) => {
    const queue = new Queue();
    visited[start] = 1;
    queue.push(start);

    while (!queue.isEmpty()) {
      const now = queue.pop();

      const nextNum = visited[now] === 1 ? 2 : 1;

      for (const next of graph[now]) {
        // 인접 정점을 다른 집합에 추가
        if (visited[next] === 0) {
          visited[next] = nextNum;
          queue.push(next);
          continue;
        }

        // 인접 정점을 다른 집합에 넣을 수 없는 경우 false 반환
        if (visited[next] !== nextNum) return false;
      }
    }

    // 비연결 그래프 처리
    for (let i = 0; i < V; i++) {
      // 방문하지 않은 구역 방문하면서 인접 정점을 다른 집합에 넣기
      // 인접 정점을 다른 집합에 못 넣는 경우가 있으면 false 반환
      if (visited[i] === 0 && !bfs(V, graph, i, visited)) return false;
    }

    return true;
  };

  // K: 테스트 케이스 개수
  const K = input[0];
  // idx: 입력값을 찾을 인덱스
  let idx = 1;

  const answer = [];

  for (let k = 0; k < K; k++) {
    // V: 정점의 개수, E: 간선의 개수
    const [V, E] = input[idx++].split(' ').map(Number);

    // graph: 각 정점의 인접 정점 저장
    const graph = Array.from({ length: V }, () => []);
    for (let e = 0; e < E; e++) {
      const [from, to] = input[idx++].split(' ').map((num) => +num - 1);
      graph[from].push(to);
      graph[to].push(from);
    }

    const visited = Array(V).fill(0);

    answer.push(bfs(V, graph, 0, visited) ? 'YES' : 'NO');
  }

  return answer.join('\n');
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');
console.log(solution(input));
