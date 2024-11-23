function solution(input) {
  const [N, K] = input[0].split(' ').map(Number);

  const Ai = input[1].trim().split(' ').map(Number);

  // 0 ~ K-1까지 파이를 먹는 경우로 초기화
  let sum = Ai.slice(0, K).reduce((sum, value) => sum + value, 0);

  let answer = sum;

  let start = 0; // 시작점
  let end = K - 1; // 끝점
  while (true) {
    // 한 칸 오른쪽으로 이동
    sum -= Ai[start];
    start = (start + 1) % N;
    end = (end + 1) % N;
    sum += Ai[end];

    // 최댓값 저장
    answer = Math.max(answer, sum);

    // 다시 시작점이 0으로 돌아온 경우 종료
    if (start === 0) break;
  }

  console.log(answer);
}

const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
