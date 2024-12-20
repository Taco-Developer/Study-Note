function solution(input) {
  const [n, m] = input[0].split(' ').map(Number);

  // data[r][c] => [r, c]를 오른쪽 아래 끝점으로 가지는 정사각형 중 최대 크기
  const data = input.slice(1).map((row) => row.trim().split('').map(Number));
  for (let r = 1; r < n; r++) {
    for (let c = 1; c < m; c++) {
      if (data[r][c] === 0) continue;
      // 왼쪽 위, 위, 왼쪽에 있는 정사각형 크기를 확인
      // 한 부분이라도 0이 있는 경우 최대 정사각형 크기는 1임
      // 모든 부분의 값이 같다면 정사각형 크기는 인접값 + 1임
      // 모두 0은 아니지만 일치하지도 않는다면 정사각형 크기는 인접값 중 가장 작은 값 + 1임
      data[r][c] += Math.min(
        data[r - 1][c - 1],
        data[r][c - 1],
        data[r - 1][c]
      );
    }
  }

  let answer = 0;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      if (data[r][c] > answer) answer = data[r][c];
    }
  }

  console.log(answer * answer);
}

const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
