function solution(input) {
  const T = +input[0];
  let inputIdx = 0;
  const answer = [];

  for (let t = 1; t <= T; t++) {
    const saledPrices = [];
    const originalPriceMap = {};

    inputIdx += 2;
    input[inputIdx]
      .trim()
      .split(' ')
      .forEach((num) => {
        // 원래 가격인 경우 저장된 개수 - 1
        if (originalPriceMap[num]) {
          originalPriceMap[num]--;
          return;
        }

        // 세일된 가격인 경우
        saledPrices.push(num);
        // 원래 가격 찾아서 개수 + 1
        originalPriceMap[`${(num / 3) * 4}`] =
          (originalPriceMap[`${(num / 3) * 4}`] ?? 0) + 1;
      });

    answer.push(`Case #${t}: ${saledPrices.join(' ')}`);
  }

  return answer.join('\n');
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');
console.log(solution(input));
