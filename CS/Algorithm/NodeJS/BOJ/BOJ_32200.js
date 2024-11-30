function solution(input) {
  const [N, X, Y] = input[0].split(' ').map(Number);

  const sandwiches = input[1].split(' ').map(Number);

  const answer = [0, 0];

  for (let i = 0; i < N; i++) {
    // 해결할 수 있는 끼니 수
    const cnt = Math.floor(sandwiches[i] / X);
    answer[0] += cnt;

    // 남은 조각
    const piece = sandwiches[i] % X;

    // 남은 조각이 없거나 모든 끼니를 최대 길이로 먹었을 때 남은 조각이 없는 경우
    if (piece === 0 || (Y - X) * cnt >= piece) continue;

    // 최대로 먹어도 남은 조각이 있다면 해당 조각 버리기
    answer[1] += piece - (Y - X) * cnt;
  }

  console.log(answer.join('\n'));
}
const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
