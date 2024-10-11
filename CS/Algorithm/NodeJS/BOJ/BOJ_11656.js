function solution(input) {
  const inputLen = input.length;

  const tailArray = [];
  for (let i = inputLen - 1; i >= 0; i--) {
    tailArray.push(input.slice(i));
  }
  tailArray.sort();

  console.log(tailArray.join('\n'));
}

const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim();

solution(input);
