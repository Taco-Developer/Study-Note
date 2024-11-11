function solution(input) {
  const [N, M] = input[0].split(' ').map(Number);
  const dots = input[1]
    .trim()
    .split(' ')
    .map(Number)
    .sort((a, b) => a - b);

  // 타겟보다 크거나 같은 최솟값 인덱스
  const getMinIdx = (target) => {
    let start = 0;
    let end = N - 1;
    let result = -1;

    while (start <= end) {
      let mid = (start + end) >> 1;
      if (dots[mid] === target) return mid;
      if (dots[mid] > target) {
        result = mid;
        end = mid - 1;
        continue;
      }
      if (dots[mid] < target) start = mid + 1;
    }

    return result;
  };

  // 타겟보다 작거나 같은 최댓값 인덱스
  const getMaxIdx = (target, min) => {
    let start = min;
    let end = N - 1;
    let result = start;

    while (start <= end) {
      let mid = (start + end) >> 1;

      if (dots[mid] === target) return mid;

      if (dots[mid] > target) {
        end = mid - 1;
        continue;
      }

      if (dots[mid] < target) {
        result = mid;
        start = mid + 1;
      }
    }

    return result;
  };

  const answer = [];
  for (let i = 2; i < M + 2; i++) {
    const [start, end] = input[i].split(' ').map(Number);

    // 선의 시작점보다 큰 가장 작은 점의 인덱스
    const minIdx = getMinIdx(start, true);

    // 선의 시작점보다 모든 점이 작거나 선의 끝점보다 큰 경우
    if (minIdx === -1 || dots[minIdx] > end) {
      answer.push(0);
      continue;
    }
    // 선에 포함되는 가장 작은 점이 선의 끝점과 같은 경우
    else if (dots[minIdx] === end) {
      answer.push(1);
      continue;
    }

    // 선의 끝점보다 작은 가장 큰 점의 인덱스
    const maxIdx = getMaxIdx(end, minIdx);

    // 선에 포함되는 점 개수 추가
    answer.push(maxIdx - minIdx + 1);
  }

  console.log(answer.join('\n'));
}

const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
