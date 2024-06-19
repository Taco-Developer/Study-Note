function solution(input) {
  // N: 정점의 수, M: 간선의 수, R: 시작 정점
  const [N, M, R] = input[0].split(' ').map(Number);

  // E: 간선 정보
  const E = Array.from({ length: N }, () => []);
  for (let i = 1; i <= M; i++) {
    const [u, v] = input[i].split(' ').map((num) => +num - 1);
    E[u].push(v);
    E[v].push(u);
  }
  for (let i = 0; i < N; i++) E[i].sort((a, b) => b - a);

  const answer = Array(N).fill(0);
  let cnt = 1;

  // N: 정점의 수, E: 간선 정보, now : 현재 정점, answer: 방문 순서 배열
  const dfs = (N, E, now, answer) => {
    answer[now] = cnt++;

    E[now].forEach((next) => {
      if (answer[next]) return;
      dfs(N, E, next, answer);
    });
  };

  dfs(N, E, R - 1, answer);

  return answer.join('\n');
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');
console.log(solution(input));
