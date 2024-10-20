function solution(input) {
  const [N, M] = input[0].split(' ').map(Number);
  const paper = input.slice(1).map((row) => row.trim().split(' ').map(Number));

  let answer = 0;

  for (let r = 0; r < N; r++) {
    // cnt[1]: 1로 시작하는 시작점 개수, cnt[2]: 2로 시작하는 시작점 개수
    const cnt = [0, 0, 0];

    // 첫 번째 색 카운트
    if (paper[r][0] !== 0) cnt[paper[r][0]]++;

    for (let c = 1; c < M; c++) {
      // 색칠되지 않은 경우
      if (paper[r][c] === 0) {
        // 이전에도 다른 색을 칠하지 않았다면 패스
        if (cnt[1] + cnt[2] === 0) continue;

        // 시작점이 가장 많은 색으로 한 번 칠하고 다른 색으로 덧칠
        answer += 1 + Math.min(cnt[1], cnt[2]);
        cnt[1] = cnt[2] = 0;
        continue;
      }

      // 이전 색과 다른 경우 카운트
      if (paper[r][c] !== paper[r][c - 1]) cnt[paper[r][c]]++;
    }

    // 아직 칠하지 않은 부분 색칠하기
    if (cnt[1] + cnt[2] !== 0) answer += 1 + Math.min(cnt[1], cnt[2]);
  }

  console.log(answer);
}

const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
