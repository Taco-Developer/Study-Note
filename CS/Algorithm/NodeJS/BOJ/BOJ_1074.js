// 입력
const [N, r, c] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split(' ')
  .map((num) => +num);

// 찾으려는 위치의 점수를 찾는 함수
// sr: 시작 행, sc: 시작 열, tr: 목표 행, tc: 목표 열, 현재 사각형 길이, order: 순서
function checkPosition(sr, sc, tr, tc, length, order) {
  // 길이가 2인 경우가 가장 작은 정사각형인 경우이므로 이때 순서를 확인
  if (length === 2) {
    const ans = order + (tr - sr) * 2 + (tc - sc);
    console.log(ans);
    return;
  }

  // 정사각형은 좌상, 우상, 좌하, 우하로 4등분으로 나눠서 생각
  const dividedLen = length / 2;

  // 4개의 사각형은 아래쪽에 위치한 사각형에 목표점이 있는 경우
  if (tr >= sr + dividedLen) {
    // 이전 사각형에 작성되는 순서를 더함
    order += dividedLen * dividedLen * 2;
    // 시작 행 업데이트
    sr += dividedLen;
  }

  // 4개의 사각형은 오른쪽에 위치한 사각형에 목표점이 있는 경우
  if (tc >= sc + dividedLen) {
    // 이전 사각형에 작성되는 순서를 더함
    order += dividedLen * dividedLen;
    // 시작 열 업데이트
    sc += dividedLen;
  }

  // 시작점, 길이, 순서를 업데이트해서 더 작은 사각형을 확인
  checkPosition(sr, sc, tr, tc, dividedLen, order);
}

// 배열 길이
const length = Math.pow(2, N);

checkPosition(0, 0, r, c, length, 0);
