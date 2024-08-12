function solution(input) {
  let inputIdx = 0;

  // 잔디를 모두 깎았는지 확인하는 함수 (positions: 시작 위치, cnt: 위치 개수, w: 너비, last: 마지막 범위)
  const checkLine = (positions, cnt, w, last) => {
    const start = positions[0] - w / 2;

    if (start > 0) return false;

    let end = positions[0] + w / 2;
    for (let i = 1; i < cnt; i++) {
      if (end < positions[i] - w / 2) return false;
      end = positions[i] + w / 2;
    }

    if (end < last) return false;
    return true;
  };

  const answer = [];

  while (true) {
    const [nx, ny, w] = input[inputIdx++].split(' ').map(Number);

    if (nx === 0) break;

    const xiArr = input[inputIdx++]
      .split(' ')
      .map(Number)
      .sort((a, b) => a - b);

    const yiArr = input[inputIdx++]
      .split(' ')
      .map(Number)
      .sort((a, b) => a - b);

    if (!checkLine(xiArr, nx, w, 75) || !checkLine(yiArr, ny, w, 100)) {
      answer.push('NO');
      continue;
    }

    answer.push('YES');
  }

  console.log(answer.join('\n'));
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

solution(input);
