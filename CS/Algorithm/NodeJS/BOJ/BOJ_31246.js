function solution(input) {
  const [N, K] = input[0].split(' ').map(Number);

  let getCnt = 0; // 낙찰받은 지면 개수
  const priceGapMap = {}; // MOLOCO 입찰가와 다른 회사 입찰가의 차이(key: 차이, value: 해당하는 지면 개수)
  for (let i = 1; i <= N; i++) {
    const [A, B] = input[i].split(' ').map(Number);

    if (A >= B) getCnt++; // 낙찰
    else priceGapMap[B - A] = (priceGapMap[B - A] ?? 0) + 1;
  }

  let answer = 0;
  const plusPrices = Object.keys(priceGapMap).sort((a, b) => b - a); // 추가 낙찰을 위한 증가 가격 배열(내림차순)
  while (getCnt < K) {
    const plusPrice = plusPrices.pop(); // 증가 가격
    getCnt += priceGapMap[plusPrice];
    answer = plusPrice;
  }

  console.log(answer);
}
const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
