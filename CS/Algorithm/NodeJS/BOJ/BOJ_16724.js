// 피리 부는 사나이

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

solve();

function solve() {
  const dirMap = {
    U: [-1, 0],
    D: [1, 0],
    L: [0, -1],
    R: [0, 1],
  };
  const [N, M] = input[0].split(' ').map(Number);
  const mapData = input.slice(1, N + 1).map((data) => data.trim());
  // 지도에서 연결된 곳은 같은 숫자로 표시
  // -1: 안전 구역, 0: 확인하지 않음, 1 이상: 숫자가 같은 곳은 연결된 곳
  const visited = Array.from({ length: N }, () => Array(M).fill(0));
  // 현재 확인 중인 순환 번호
  let cnt = 1;
  // 안전 구역 개수
  let answer = 0;

  // 연결된 곳 찾기
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      // 이미 연결된 곳은 생략
      if (visited[y][x]) continue;
      dfs(y, x, cnt);
      cnt++;
    }
  }

  console.log(answer);

  function dfs(y, x, cnt) {
    // 현재 확인 중인 번호로 저장
    visited[y][x] = cnt;

    const [dy, dx] = dirMap[mapData[y][x]];
    const ny = y + dy;
    const nx = x + dx;

    // 다음 위치가 이미 현재 번호로 저장되어 있는 경우 현재 위치가 순환의 마지막이므로 안전구역 설정
    if (visited[ny][nx] === cnt) {
      visited[y][x] = -1;
      answer++;
      return;
    }

    // 다음 위치가 현재확인 중인 번호가 아닌 안전 구역이라면 안전구역이 이미 설정되었으므로 종료
    // 안전 구역이 아닌 다른 순환 번호인 경우에도 해당 순환 번호와 연결된 안전구역으로 가므로 종료
    if (visited[ny][nx]) {
      return;
    }

    dfs(ny, nx, cnt);
  }
}
