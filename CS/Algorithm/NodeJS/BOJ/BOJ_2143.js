// 두 배열의 합

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

solve(input);
solve2(input);

function solve(input) {
  const T = Number(input[0]);
  const A = input[2].trim().split(' ').map(Number);
  const B = input[4].trim().split(' ').map(Number);

  // B 부배열 합을 만들 수 있는 개수
  const sumB = {};

  let stack = [];

  B.map((num) => {
    const tmp = [];

    while (stack.length !== 0) {
      const prev = stack.pop();
      const next = prev + num;
      // 이전 값에 현재 값 더해서 카운트
      sumB[next] ? sumB[next]++ : (sumB[next] = 1);
      tmp.push(next);
    }

    // 현재 값만 있는 경우 카운트
    sumB[num] ? sumB[num]++ : (sumB[num] = 1);
    tmp.push(num);
    stack = tmp;
  });

  stack = [];
  let answer = 0;

  A.map((num) => {
    const tmp = [];

    while (stack.length !== 0) {
      const prev = stack.pop();
      const next = prev + num;
      tmp.push(next);
      if (sumB[T - next]) {
        answer += sumB[T - next];
      }
    }

    if (sumB[T - num]) {
      answer += sumB[T - num];
    }
    tmp.push(num);
    stack = tmp;
  });

  console.log(answer);
}

function solve2(input) {
  const T = Number(input[0]);
  const n = Number(input[1]);
  const m = Number(input[3]);
  const A = input[2].trim().split(' ').map(Number);
  const B = input[4].trim().split(' ').map(Number);
  // key: A 부 배열 합, value: 개수
  const aMap = {};
  for (let i = 0; i < n; i++) {
    let sum = 0;
    for (let j = i; j < n; j++) {
      sum += A[j];
      aMap[sum] ? aMap[sum]++ : (aMap[sum] = 1);
    }
  }

  let answer = 0;

  // B 부 배열 합을 구하면서 A 부 배열과 합쳐서 T가 되는 경우 카운트
  for (let i = 0; i < m; i++) {
    let sum = 0;
    for (let j = i; j < m; j++) {
      sum += B[j];
      if (aMap[T - sum]) answer += aMap[T - sum];
    }
  }

  console.log(answer);
}
