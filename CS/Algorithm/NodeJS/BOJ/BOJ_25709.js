function solution(input) {
  let num = input;

  let answer = 0;

  // num이 빈 문자열이나 0이 되는 경우 종료
  while (num !== '' && +num !== 0) {
    answer++;

    const i = num.indexOf('1'); // 1 위치 확인

    // 1이 없는 경우 -1
    if (i === -1) {
      num = (+num - 1).toString();
      continue;
    }

    // 1 제거
    num = num.slice(0, i) + num.slice(i + 1);
  }

  console.log(answer);
}

const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim();

solution(input);
