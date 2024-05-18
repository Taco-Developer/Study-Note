function solution(input) {
  const getGcd = (num1, num2) => {
    while (num2 !== 0) {
      [num1, num2] = [num2, num1 % num2];
    }

    return num1;
  };

  const [A, B] = input;
  return (A * B) / getGcd(A, B);
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number);
console.log(solution(input));
