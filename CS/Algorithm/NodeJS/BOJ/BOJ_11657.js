function solution(input) {
  const [N, M] = input[0].split(' ').map(Number);
  const edges = input.slice(1).map((row) => row.trim().split(' ').map(Number));

  // times[i]: 각 위치 도달에 필요한 시간
  const times = Array(N + 1).fill(Infinity);
  times[1] = 0;

  // 간선을 1 ~ N-1개를 사용했을 때 각 위치 도달 시간 저장
  // i: 간선 사용 개수
  for (let i = 1; i < N; i++) {
    // 모든 간선 확인
    for (let j = 0; j < M; j++) {
      // A: 출발, B: 도착, C: 시간
      const [A, B, C] = edges[j];

      // 출발지에 도달 불가
      if (times[A] === Infinity) continue;

      // 출발지를 거쳐 B로 가는 시간이 이전에 확인된 B로 가는 시간보다 과거인 경우
      if (times[A] + C < times[B]) {
        times[B] = times[A] + C;
      }
    }
  }

  // 무한히 과거로 갈 수 있는지 확인
  let isPossible = false;
  for (let i = 0; i < M; i++) {
    const [A, B, C] = edges[i];
    if (times[A] + C < times[B]) {
      isPossible = true;
      break;
    }
  }

  // 무한히 과거로 이동 가능
  if (isPossible) {
    console.log(-1);
    return;
  }

  const answer = [];
  for (let i = 2; i <= N; i++) {
    // 도달 불가
    if (times[i] === Infinity) answer.push(-1);
    else answer.push(times[i]);
  }

  console.log(answer.join('\n'));
}

const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
