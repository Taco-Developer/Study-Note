function solution(input) {
  const S = input;
  const SLen = input.length;

  let outputZeroCnt = 0; // 출력할 0의 개수
  let removeOneCnt = 0; // 제거할 1의 개수
  for (let i = 0; i < SLen; i++) {
    if (S[i] === '0') outputZeroCnt++;
    else removeOneCnt++;
  }
  outputZeroCnt /= 2;
  removeOneCnt /= 2;

  let answer = '';

  for (let i = 0; i < SLen; i++) {
    // 0인 경우
    if (S[i] === '0') {
      // 출력할 0이 있는 경우 0 출력
      if (outputZeroCnt !== 0) {
        answer += S[i];
        outputZeroCnt--;
      }
    }
    // 1인 경우
    else {
      // 제거할 1이 없다면 1 출력
      if (removeOneCnt === 0) answer += S[i];
      // 제거할 1이 있는 경우 1 제거
      else removeOneCnt--;
    }
  }

  console.log(answer);
}

const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim();

solution(input);
