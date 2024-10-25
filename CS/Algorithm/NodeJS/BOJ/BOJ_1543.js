function solution(input) {
  const document = input[0];
  const word = input[1];
  const wordLen = word.length;

  let answer = 0;
  let searchStartIdx = -wordLen;

  while (true) {
    // 찾으려는 단어가 시작하는 인덱스
    const findIdx = document.indexOf(word, searchStartIdx + wordLen);

    // 단어가 없는 경우 종류
    if (findIdx === -1) break;

    // 단어가 있는 경우 카운트
    answer++;
    // 검색 범위 업데이트
    searchStartIdx = findIdx;
  }

  console.log(answer);
}

const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
