// 분수찾기

function solution(X) {
  // sum => i번째 지그재그의 마지막 위치
  let sum = 0;
  for (let i = 1; i <= X; i++) {
    sum += i;
    if (sum < X) continue;

    const isEven = i & 1 ? false : true;
    // 마지막 위치와 현재 위치 차이
    const diff = sum - X;
    // i가 짝수인 경우 분자 => i, 분모 => 1
    // i가 홀수인 경우 분자 => 1, 분모 => i;
    let numerator = isEven ? i : 1;
    let denominator = i - numerator + 1;

    // 짝수인 경우 차이만큼 분자에선 빼고 분모에선 더하기
    if (isEven) {
      numerator -= diff;
      denominator += diff;
    }
    // 홀수인 경우 차이만큼 분자에선 더하고 분모에선 빼기
    else {
      numerator += diff;
      denominator -= diff;
    }

    return `${numerator}/${denominator}`;
  }
}

const X = Number(
  require('fs')
    .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
    .toString()
);

console.log(solution(X));
