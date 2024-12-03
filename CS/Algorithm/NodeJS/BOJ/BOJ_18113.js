function solution(input) {
  const [_, K, M] = input[0].split(' ').map(Number);

  // gimbaps: 폐기하고 남은 김밥 정보
  const gimbaps = input
    .slice(1)
    // 꼬리 잘라서 버리기
    .map((gimbapLen) =>
      gimbapLen >= K * 2 ? gimbapLen - K * 2 : gimbapLen - K
    )
    // 꼬리를 자른 후 김밥이 남아있는 것만 남겨두기(길이 > 0)
    .filter((gimbapLen) => gimbapLen > 0);

  let answer = -1;

  // start, end: 탐색 범위
  let start = 1;
  let end = Math.max(...gimbaps);
  while (start <= end) {
    // p: 목표 김밥 조각 길이
    const p = (start + end) >> 1;

    // pieces: p 길이의 김밥 조각 개수
    const pieces = gimbaps.reduce(
      (sum, gimbap) => sum + Math.floor(gimbap / p),
      0
    );

    // 목표 개수 도달
    if (pieces >= M) {
      answer = p;
      start = p + 1;
      continue;
    }

    // 목표 개수 미달
    end = p - 1;
  }

  console.log(answer);
}
const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
