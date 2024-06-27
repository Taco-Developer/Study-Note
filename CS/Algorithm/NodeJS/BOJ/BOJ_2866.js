function solution(input) {
  const [R, C] = input[0].split(' ').map(Number);

  const strings = Array(C).fill('');
  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      strings[c] += input[r + 1][c];
    }
  }

  let answer = 0;

  for (let r = 1; r < R; r++) {
    const checkMap = {};

    for (let c = 0; c < C; c++) {
      const string = strings[c].slice(r);

      if (checkMap[string]) return answer;
      checkMap[string] = 1;
    }

    answer++;
  }

  return answer;
}

function solution2(input) {
  const [R, C] = input[0].split(' ').map(Number);

  const strings = Array(C).fill('');
  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      strings[c] += input[r + 1][c];
    }
  }

  // 행을 start ~ end 범위에서 이분탐색으로 선택
  //  => mid에서 중복이 없다면 mid까지 행을 지우고 mid + 1 ~ end까지 탐색
  //  => mid에서 중복이 있다면 start ~ mid - 1까지 탐색
  let answer = 0;
  let start = 1;
  let end = R - 1;
  while (start <= end) {
    const mid = (start + end) >> 1;

    let isNoDuplication = true;
    const checkMap = {};
    for (let c = 0; c < C; c++) {
      const string = strings[c].slice(mid);
      if (checkMap[string]) {
        isNoDuplication = false;
        break;
      }
      checkMap[string] = 1;
    }

    if (isNoDuplication) {
      answer = mid;
      start = mid + 1;
      continue;
    }

    end = mid - 1;
  }

  return answer;
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');
console.log(solution2(input));
