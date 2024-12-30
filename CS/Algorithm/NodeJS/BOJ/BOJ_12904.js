function solution(input) {
  const S = input[0].trim();
  const T = input[1].trim().split('');

  const SLen = S.length;
  let TLen = T.length;

  // 반대로 T에서 S를 만들 수 있는지 확인
  while (TLen > SLen) {
    const lastChar = T.pop();
    TLen--;

    // 마지막이 A인 경우 그대로 두기
    if (lastChar === 'A') continue;
    // 마지막이 B인 경우 뒤집기
    else T.reverse();
  }

  console.log(T.join('') === S ? 1 : 0);
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath, 'utf-8').toString().trim().split('\n');

solution(input);
