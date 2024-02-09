const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

// 테스트 케이스 개수
const TC = +input[0];
const ans = Array(TC).fill('NO');
// 입력값 찾을 인덱스
let inputIdx = 1;

for (let tc = 0; tc < TC; tc++) {
  // N: 지점 개수, M: 도로 개수, W: 웜홀 개수ㄹ
  const [N, M, W] = input[inputIdx].trim().split(' ').map(Number);
  inputIdx++;

  // N * N 배열
  const graph = Array.from({ length: N }, () => Array(N).fill(Infinity));
  // 도로 정보 저장
  setGraph(false, M, graph);
  // 웜홀 정보 저장
  setGraph(true, W, graph);

  // 플로이드 워셜 (모든 정점 최단 거리 구하기)
  for (let k = 0; k < N; k++) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        const time = graph[i][k] + graph[k][j];
        graph[i][j] = Math.min(graph[i][j], time);
      }
    }
  }

  // i 출발 -> i 도착 음수 찾기
  for (let i = 0; i < N; i++) {
    if (graph[i][i] >= 0) continue;
    ans[tc] = 'YES';
    break;
  }
}

console.log(ans.join('\n'));

// 간선 정보 저장
function setGraph(isWormhole, size, graph) {
  for (let i = 0; i < size; i++) {
    const [S, E, T] = input[inputIdx].trim().split(' ').map(Number);
    inputIdx++;
    // 최솟값(웜홀인 경우 음수 저장)
    const min = Math.min(graph[S - 1][E - 1], isWormhole ? 0 - T : T);
    graph[S - 1][E - 1] = min;
    // 도로는 방향이 없음
    if (!isWormhole) graph[E - 1][S - 1] = min;
  }
}
