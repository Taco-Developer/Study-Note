// 세 용액
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

solve2(input);

function solve(input) {
  const N = Number(input[0]);

  const liquid = input[1].trim().split(' ').map(Number);
  liquid.sort((a, b) => a - b);

  if (liquid[N - 1] <= 0) {
    console.log(liquid.slice(N - 3, N).join(' '));
    return;
  }

  if (liquid[0] >= 0) {
    console.log(liquid.slice(0, 3).join(' '));
    return;
  }

  let answer = [];
  let min = Infinity;

  // first, second 고정
  for (let first = 0; first < N - 2; first++) {
    for (let second = first + 1; second < N - 1; second++) {
      // fisrt + second
      const selectedSum = getSum([first, second]);

      // third 찾기 =>
      let left = second + 1;
      let right = N - 1;
      while (left <= right) {
        const middle = Math.floor((left + right) / 2);
        const sum = selectedSum + liquid[middle];

        if (sum === 0) {
          console.log(getLiquid([first, second, middle]));
          return;
        }

        if (Math.abs(min) > Math.abs(sum)) {
          min = sum;
          answer = [first, second, middle];
        }

        if (sum > 0) {
          right = middle - 1;
          continue;
        }

        left = middle + 1;
      }
    }
  }

  console.log(getLiquid(answer));

  function getSum(positions) {
    return positions.reduce((acc, cur) => acc + liquid[cur], 0);
  }

  function getLiquid(positions) {
    return positions.reduce((acc, cur) => acc + ' ' + liquid[cur], '');
  }
}

function solve2(input) {
  const N = Number(input[0]);

  const liquid = input[1].trim().split(' ').map(Number);
  liquid.sort((a, b) => a - b);

  if (liquid[N - 1] <= 0) {
    console.log(getLiquid([N - 3, N - 2, N - 1]));
    return;
  }

  if (liquid[0] >= 0) {
    console.log(getLiquid([0, 1, 2]));
    return;
  }

  let answer = [0, 0, 0];
  let min = Infinity;

  // first, second, third => 용액 순서
  for (let first = 0; first < N - 2; first++) {
    let second = first + 1;
    let third = N - 1;

    while (second < third) {
      const liquidSum = getSum(first, second, third);

      // 최솟값 저장
      if (Math.abs(min) > Math.abs(liquidSum)) {
        min = liquidSum;
        answer[0] = first;
        answer[1] = second;
        answer[2] = third;
      }

      // 용액의 합이 0이 나온다면 종료
      if (min === 0) {
        console.log(getLiquid(answer));
        return;
      }

      // 용액의 합이 음수라면 second 증가
      if (liquidSum < 0) {
        second++;
        continue;
      }

      // 용액의 합이 양수라면 third 감소
      third--;
    }
  }

  console.log(getLiquid(answer));

  function getSum(first, second, third) {
    return liquid[first] + liquid[second] + liquid[third];
  }

  function getLiquid(positions) {
    return positions.map((position) => liquid[position]).join(' ');
  }
}
