function solution(input) {
  const [width, height] = input[0].split(' ').map(Number);

  const bottom = [];
  const top = [];
  input.slice(1).forEach((len, index) => {
    if ((index & 1) === 0) {
      bottom.push(+len);
      return;
    }
    top.push(+len);
  });
  bottom.sort((a, b) => a - b);
  top.sort((a, b) => a - b);

  // 걸리지 않는 장애물 개수 반환하는 함수
  const getCnt = (h, hurdleArr, max) => {
    let cnt = max;

    let start = 0;
    let end = max - 1;
    while (start <= end) {
      const mid = (start + end) >> 1;

      // 중간에 위치한 높이가 h에 걸리는 경우
      if (hurdleArr[mid] >= h) {
        cnt = mid;
        end = mid - 1;
        continue;
      }

      if (hurdleArr[mid] < h) {
        start = mid + 1;
      }
    }

    return cnt;
  };

  const answer = [Infinity, 0];

  for (let h = 0; h < height; h++) {
    // 전체 장애물 개수에서 현재 높이에 걸리지 않는 장애물 개수 빼기
    const cnt =
      width -
      getCnt(h + 1, bottom, width / 2) -
      getCnt(height - h, top, width / 2);

    // 최솟값 업데이트
    if (answer[0] > cnt) {
      answer[0] = cnt;
      answer[1] = 1;
      continue;
    }

    // 이미 최솟값인 경우 개수 업데이트
    if (answer[0] === cnt) {
      answer[1]++;
    }
  }

  return answer.join(' ');
}

function solution2(input) {
  const [width, height] = input[0].split(' ').map(Number);

  const bottom = Array(height + 1).fill(0);
  const top = Array(height + 1).fill(0);
  input.slice(1).forEach((len, index) => {
    if ((index & 1) === 0) {
      bottom[+len]++;
      return;
    }
    top[+len]++;
  });

  for (let h = 2; h <= height; h++) {
    bottom[h] += bottom[h - 1];
    top[h] += top[h - 1];
  }

  const answer = [Infinity, 0];
  for (let h = 1; h <= height; h++) {
    // 걸리는 장애물 개수
    const cnt = bottom[height] - bottom[h - 1] + top[height] - top[height - h];

    if (answer[0] > cnt) {
      answer[0] = cnt;
      answer[1] = 1;
      continue;
    }

    if (answer[0] === cnt) {
      answer[1]++;
    }
  }

  return answer.join(' ');
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');
console.log(solution2(input));
