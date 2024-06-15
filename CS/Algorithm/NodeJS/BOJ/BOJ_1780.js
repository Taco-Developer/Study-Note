function solution(input) {
  const N = +input[0];

  // 계산을 편하게 하기 위해 -1, 0, 1을 0, 1, 2로 변환
  const paper = input.slice(1).map((row) =>
    row
      .trim()
      .split(' ')
      .map((num) => +num + 1)
  );

  const check = (y, x, len) => {
    if (len === 1) return paper[y][x];

    const nextLen = len / 3;

    // 9등분 후 저장
    let nums = '';
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        nums += check(y + nextLen * i, x + nextLen * j, nextLen);
      }
    }

    // nums 길이가 9이고 하나의 수로 이루어진 경우 하나만 반환
    if (nums.length === 9 && nums === nums[0].repeat(9)) return nums[0];

    // 하나의 숫자가 아닌 경우 전부 반환
    return nums;
  };

  const answer = check(0, 0, N)
    .split('')
    .reduce(
      (answer, num) => {
        answer[+num]++;
        return answer;
      },
      [0, 0, 0]
    );

  return answer.join('\n');
}

function solution2(input) {
  const N = +input[0];
  const paper = input.slice(1).map((row) =>
    row
      .trim()
      .split(' ')
      .map((num) => +num + 1)
  );

  const answer = [0, 0, 0];

  const check = (y, x, len) => {
    // 일치 여부 확인을 위한 수
    const target = paper[y][x];

    // 길이가 1인 경우 바로 해당 수 개수 1 더하기
    if (len === 1) return answer[target]++;

    // 하나의 수로 이루어져 있는지 확인
    let isSame = true;
    for (let i = 0; i < len; i++) {
      if (!isSame) break;
      for (let j = 0; j < len; j++) {
        if (target !== paper[y + i][x + j]) {
          isSame = false;
          break;
        }
      }
    }

    // 하나의 숫자인 경우 해당 수 개수 1 더하기
    if (isSame) return answer[target]++;

    // 9등분 후 확인
    const nextLen = len / 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        check(y + i * nextLen, x + j * nextLen, nextLen);
      }
    }
  };

  check(0, 0, N);

  return answer.join('\n');
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');
console.log(solution2(input));
