function solution(input) {
  const N = +input[0];
  const secondLine = [0].concat(input.slice(1).map(Number));

  // selectedNums[i] !== 0 => 최종적으로 i가 선택됨
  const selectedNums = Array(N + 1).fill(0);

  // 사이클을 확인하는 동안 방문 정보
  const visited = Array(N + 1).fill(0);

  // 시작 숫자에서 시작해서서 시작 숫자로 돌아오는 사이클이 있는 경우 해당 사이클에 포함된 숫자 저장
  const dfs = (start, now) => {
    // 방문 처리
    visited[now] = 1;

    const next = secondLine[now];

    // 시작 숫자로 다시 도착
    if (next === start) {
      for (let i = 1; i <= N; i++) {
        if (visited[i]) selectedNums[i] = i;
      }
    }
    // 다음 숫자로 이동
    else if (visited[next] === 0) dfs(start, next);

    // 방문 처리 해제
    visited[now] = 0;
  };

  // 1부터 N까지 확인
  for (let i = 1; i <= N; i++) {
    if (selectedNums[i]) continue;
    dfs(i, i);
  }

  const answer = [0];
  for (let i = 1; i <= N; i++) {
    if (selectedNums[i] === 0) continue;

    answer[0]++;
    answer.push(i);
  }

  console.log(answer.join('\n'));
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath, 'utf-8').toString().trim().split('\n');

solution(input);
