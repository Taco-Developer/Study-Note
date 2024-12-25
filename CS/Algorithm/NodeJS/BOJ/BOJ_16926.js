function solution(input) {
  const [N, M, R] = input[0].split(' ').map(Number);
  const arr = input.slice(1).map((row) => row.trim().split(' ').map(Number));

  const answer = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => 0)
  );

  let position = 0;
  while (position < Math.min(N, M) && answer[position][position] === 0) {
    // 현재 돌리려는 위치의 정보를 뽑기
    const line = [];

    // 왼쪽에서 오른쪽 정보
    for (let i = position; i < M - 1 - position; i++) {
      line.push(arr[position][i]);
    }

    // 오른쪽 위에서 아래 정보
    for (let i = position; i < N - 1 - position; i++) {
      line.push(arr[i][M - 1 - position]);
    }

    // 오른쪽에서 왼쪽 정보
    for (let i = M - 1 - position; i > position; i--) {
      line.push(arr[N - 1 - position][i]);
    }

    // 왼쪽 아래에서 위 정보
    for (let i = N - 1 - position; i > position; i--) {
      line.push(arr[i][position]);
    }

    // 돌리기
    const rotatedFront = R % line.length;
    const rotatedLine = line
      .slice(rotatedFront)
      .concat(...line.slice(0, rotatedFront));

    // 돌린 정보 저장
    let idx = 0;
    // 왼쪽에서 오른쪽 정보
    for (let i = position; i < M - 1 - position; i++) {
      answer[position][i] = rotatedLine[idx++];
    }

    // 오른쪽 위에서 아래 정보
    for (let i = position; i < N - 1 - position; i++) {
      answer[i][M - 1 - position] = rotatedLine[idx++];
    }

    // 오른쪽에서 왼쪽 정보
    for (let i = M - 1 - position; i > position; i--) {
      answer[N - 1 - position][i] = rotatedLine[idx++];
    }

    // 왼쪽 아래에서 위 정보
    for (let i = N - 1 - position; i > position; i--) {
      answer[i][position] = rotatedLine[idx++];
    }

    // 확인할 위치 변경
    position++;
  }

  console.log(answer.map((row) => row.join(' ')).join('\n'));
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath, 'utf-8').toString().trim().split('\n');

solution(input);
