function solution(input) {
  const n = BigInt(input);

  let answer = 0;
  const getAnswer = (start, end) => {
    if (start > end) return;

    const mid = (start + end) / 2n;
    const pow = mid * mid;

    if (pow === n) {
      console.log(mid.toString());
      process.exit();
    } else if (pow < n) {
      getAnswer(mid + 1n, end);
    } else {
      answer = mid;
      getAnswer(start, mid - 1n);
    }
  };

  getAnswer(0n, n);

  console.log(answer.toString());
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim();
solution(input);
