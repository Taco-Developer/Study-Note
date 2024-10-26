function solution(input) {
  const N = +input[0];
  const [A, B] = input[1].split(' ').map(Number);
  const C = +input[2];
  const D = input
    .slice(3)
    .map(Number)
    .sort((a, b) => b - a);

  let price = A;
  let calorie = C;

  for (let i = 0; i < N; i++) {
    const nextPrice = price + B;
    const nextCalorie = calorie + D[i];

    if (calorie / price > nextCalorie / nextPrice) break;

    price = nextPrice;
    calorie = nextCalorie;
  }

  console.log(Math.floor(calorie / price));
}

const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
