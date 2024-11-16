// 새의 크기를 내림차순 후 이분탐색
function solution(input) {
  const N = +input[0];

  const A = input[1].split(' ');
  const B = input[2].split(' ');

  const Q = +input[3];

  // birds => 오름차순 정렬된 새 배열(0: 원래 인덱스, 1: 크기)
  const birds = input[4]
    .trim()
    .split(' ')
    .map((bird, index) => [index, +bird])
    .sort((a, b) => a[1] - b[1]);

  const answer = Array(Q).fill(0);

  // 검색 범위의 마지막 인덱스
  let searchEndIdx = Q - 1;

  // i: 현재 통과한 장애물 개수
  for (let i = 0; i < N && searchEndIdx >= 0; i++) {
    // 장애물 사이 간격
    const gap = +A[i] - +B[i];

    // 통과하는 마지막 새의 인덱스 찾기
    let passIndex = -1;

    let start = 0;
    let end = searchEndIdx;
    while (start <= end) {
      const mid = (start + end) >> 1;

      // 통과
      if (birds[mid][1] <= gap) {
        passIndex = mid;
        start = mid + 1;
        continue;
      }

      // 통과 못함
      end = mid - 1;
    }

    // 통과못한 새들의 최대 장애물 통과 수 저장
    for (let j = passIndex + 1; j <= searchEndIdx; j++) {
      answer[birds[j][0]] = i;
    }

    // 검색 범위 업데이트
    searchEndIdx = end;
  }

  // 모든 장애물을 통과한 새가 있는 경우
  if (searchEndIdx >= 0) {
    for (let i = 0; i <= searchEndIdx; i++) {
      answer[birds[i][0]] = N;
    }
  }

  console.log(answer.join('\n'));
}

// 통과 가능한 크기를 내림차순되는 배열로 만든 후 이분탐색
function solution2(input) {
  const N = +input[0];

  const A = input[1].split(' ');
  const B = input[2].split(' ');

  const Q = +input[3];
  const birds = input[4].trim().split(' ').map(Number);

  // 현재 통과 가능한 크기가 이전보다 크다면 의미 없으므로 이전값(최솟값)으로 저장 => 내림차순
  const gaps = [+A[0] - +B[0]];
  for (let i = 1; i < N; i++) {
    const gap = +A[i] - +B[i];
    gaps[i] = gaps[i - 1] < gap ? gaps[i - 1] : gap;
  }

  const answer = [];

  for (let i = 0; i < Q; i++) {
    let start = 0;
    let end = N - 1;
    while (start <= end) {
      const mid = (start + end) >> 1;

      // 통과
      if (birds[i] <= gaps[mid]) {
        start = mid + 1;
        continue;
      }

      // 통과 실패
      end = mid - 1;
    }

    // start는 0또는 통과한 인덱스(0 ~ 6) + 1이므로 통과한 개수와 일치함
    answer.push(start);
  }

  console.log(answer.join('\n'));
}

const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution2(input);
