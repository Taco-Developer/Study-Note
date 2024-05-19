function solution(input) {
  const getGcd = (num1, num2) => {
    while (num2 !== 0) {
      [num1, num2] = [num2, num1 % num2];
    }
    return num1;
  };

  // A 분수
  const [AChild, AParent] = input[0].split(' ').map(Number);
  // B 분수
  const [BChild, BParent] = input[1].split(' ').map(Number);

  // A + B의 분모
  let sumParent = (AParent * BParent) / getGcd(AParent, BParent);
  // A + B의 분자
  let sumChild =
    (sumParent / AParent) * AChild + (sumParent / BParent) * BChild;

  // A + B의 분모와 분자의 최대 공약수
  // 1이 아닌 경우 기약분수로 만들기
  const sumGcd = getGcd(sumParent, sumChild);
  if (sumGcd !== 1) {
    sumParent /= sumGcd;
    sumChild /= sumGcd;
  }

  return `${sumChild} ${sumParent}`;
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');
console.log(solution(input));
