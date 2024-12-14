function solution(input) {
  const [N, M] = input[0].split(' ').map(Number);

  // friendsData[i] => i의 친구 배열
  const friendsData = Array.from({ length: N }, () => []);
  for (let i = 1; i <= M; i++) {
    const [a, b] = input[i].split(' ').map(Number);
    friendsData[a].push(b);
    friendsData[b].push(a);
  }

  // 확인한 사람 표시
  const visited = Array(N).fill(0);

  // now: 현재 확인 중인 사람, cnt: 지금까지 이어진 친구 수
  const findABCDE = (now, cnt) => {
    // 이어진 사람이 5명인 경우 ABCDE를 찾음
    if (cnt === 5) {
      console.log(1);
      process.exit();
    }

    // now의 친구 중에서 확인하지 않은 친구 찾기
    for (const next of friendsData[now]) {
      if (visited[next]) continue;
      visited[next] = 1;
      findABCDE(next, cnt + 1);
      visited[next] = 0;
    }
  };

  // 0부터 N-1로 시작해서 ABCDE를 찾기
  for (let i = 0; i < N; i++) {
    // i번 사람 확인 표시
    visited[i] = 1;

    findABCDE(i, 1);

    // i번 사람 확인 표시 제거
    visited[i] = 0;
  }

  console.log(0);
}

const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
