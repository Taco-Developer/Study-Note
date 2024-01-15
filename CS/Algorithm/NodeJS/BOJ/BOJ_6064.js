const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

// 테스트 케이스
const T = +input[0];

// 정답 저장 (-1 초기화)
const ans = Array(T).fill(-1);

// 방법1 - 빼기 활용
// 찾으려는 일자에서 직전에 x나 y가 1이 되는 날짜를 찾고 찾으려는 일자(목표 일자)와 1이 되는 날짜의 일수 차이 저장
// (1, 1)에서 x나 y 중 하나가 먼저 1이 되는 일자로 이동
// 만약 M = 10, N = 12, x = 3, y = 9인 경우
// x가 1이 되기 위해선 10일이 y가 1이 되기 위해선 12일이 필요하므로 10일 이동해 (1, 11)이 됨
// 다음으로 x가 1이 되기 위해선 10일이 y가 1이 되기 위해선 2일이 필요하므로 (3, 1)이 됨
// 이런식으로 찾으려는 x나 y가 1이 되는 날짜를 찾을 수 있다면 해당 날짜까지 이동한 일수와 원래 목표와의 차이를 더해서 저장
// 만약 x와 y가 모두 다시 1이 된다면 멸망했기 때문에 -1 저장
function solve1(input, T, ans) {
  for (let t = 1; t <= T; t++) {
    const [M, N, x, y] = input[t]
      .trim()
      .split(' ')
      .map((num) => +num);

    // tx, ty: (x, y)에서 가장 가까운 x나 y가 1이 되는 날짜, plusCnt: (x, y)가 되기 위해 필요한 일수
    let [tx, ty, plusCnt] = [0, 0, 0];
    if (x >= y) {
      tx = x - y + 1;
      ty = 1;
      plusCnt = y - 1;
    } else {
      tx = 1;
      ty = y - x + 1;
      plusCnt = x - 1;
    }

    let nowX = 1;
    let nowY = 1;
    let cnt = 1;

    // 최댓값까지 필요한 일수가 같다면 멸망
    // 목표 날짜에 도달한 경우 종료
    while (!(M - nowX === N - nowY || (nowX === tx && nowY === ty))) {
      // y가 최댓값과 가까움
      if (M - nowX > N - nowY) {
        nowX += N - nowY + 1;
        cnt += N - nowY + 1;
        nowY = 1;
        // x가 최댓값과 가까움
      } else {
        nowY += M - nowX + 1;
        cnt += M - nowX + 1;
        nowX = 1;
      }
    }

    // 목표 날짜에 도착한 cnt 저장
    if (nowX === tx && nowY === ty) {
      ans[t - 1] = cnt + plusCnt;
    }
  }

  console.log(ans.join('\n'));
}

// 방법2 - 최소 공배수 활용
// x를 고정하고 y를 찾음 (x를 최댓값인 m만큼 날짜를 넘기면 x는 고정되고 y만 변경)
// M = 10, N = 12, x = 3, y = 9인 경우
// x를 3에 고정하고 M만큼 이동한다면 3, 13, 23, 33으로 이동하지만 M을 초과하면 1이 되기때문에 x가 계속 3을 유지
// y는 3, 13, 23, 33으로 이동하지만 N을 초과하면 1이 되기때문에 3, 1, 11, 9로 계속 변경됨

// M, N의 최소 공배수 이후엔 같은 날짜가 반복되므로 멸망
// M = 10, N = 12, x = 3, y = 9인 경우
// 최소 공배수 = 60으로 60일이 지나면 (60, 60) => (10, 12)가 되므로 이후엔 멸망

// 최대 공약수 찾는 함수
function gcd(a, b) {
  if (b === 0) {
    return a;
  }
  return gcd(b, a % b);
}

// 최소 공배수 찾는 함수
function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

function solve2(input, T, ans) {
  for (let t = 1; t <= T; t++) {
    const [M, N, x, y] = input[t]
      .trim()
      .split(' ')
      .map((num) => +num);

    // 최대 일수
    const max = lcm(M, N);

    for (let nowX = x; nowX <= max; nowX += M) {
      // 이동한 일수를 N(최댓값)으로 나눈 나머지가 현재 y
      nowY = nowX % N;
      // 나머지가 0인 경우는 현재 일수가 최댓값이란 의미
      if (nowY === 0) nowY = N;
      // 찾으려는 날짜를 찾음
      if (nowY === y) {
        ans[t - 1] = nowX;
        break;
      }
    }
  }

  console.log(ans.join('\n'));
}

solve2(input, T, ans);
