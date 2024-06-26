function solution(input) {
  let inputIdx = 0;
  const answer = [];

  // arr에 cd가 있는지 확인하는 함수
  const findCd = (cd, arr) => {
    // start: 구역의 시작점, end: 구역의 끝점
    let start = 0;
    let end = arr.length - 1;

    while (start <= end) {
      // 배열을 둘로 나누기
      const mid = Math.floor((start + end) / 2);

      // 중간값이 cd보다 큰 경우 오른쪽 확인
      if (arr[mid] > cd) {
        end = mid - 1;
        continue;
      }

      // 중간값이 cd보다 작은 경우 왼쪽 확인
      if (arr[mid] < cd) {
        start = mid + 1;
        continue;
      }

      // cd를 찾은 경우
      return true;
    }

    // 못 찾은 경우
    return false;
  };

  while (true) {
    // N: 상근이가 가진 cd 개수, M: 선영이가 가진 cd 개수
    const [N, M] = input[inputIdx++].split(' ').map(Number);
    if (N === 0 && M === 0) break;

    // 상근이가 가진 cd
    const sangCds = input.slice(inputIdx, inputIdx + N).map(Number);
    inputIdx += N;

    // 선영이가 가진 cd
    const sunCds = input.slice(inputIdx, inputIdx + M).map(Number);
    inputIdx += M;

    // cnt: 상근, 선영 모두 가진 cd 개수
    let cnt = 0;
    sangCds.forEach((cd) => {
      if (findCd(cd, sunCds)) cnt++;
    });

    answer.push(cnt);
  }

  return answer.join('\n');
}

function solution2(input) {
  let inputIdx = 0;
  const answer = [];

  while (true) {
    const [N, M] = input[inputIdx].split(' ').map(Number);
    if (N === 0 && M === 0) return answer.join('\n');

    // cnt: 둘 모두 가지고 있는 cd 개수
    let cnt = 0;

    // 현재 확인 중인 상근 cd 목록 인덱스
    let sangIdx = inputIdx + 1;
    // 현재 확인 중인 선영 cd 목록 인덱스
    let sunIdx = inputIdx + 1 + N;

    while (sangIdx < inputIdx + 1 + N && sunIdx < inputIdx + 1 + N + M) {
      const sangCd = +input[sangIdx];
      const sunCd = +input[sunIdx];

      if (sangCd === sunCd) {
        cnt++;
        sangIdx++;
        sunIdx++;
        continue;
      } else if (sangCd < sunCd) {
        sangIdx++;
        continue;
      } else {
        sunIdx++;
      }
    }

    answer.push(cnt);
    inputIdx += 1 + N + M;
  }
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');
console.log(solution2(input));
