// BOJ_1181 단어 정렬
// https://www.acmicpc.net/problem/1181
// 시간 제한 2초, 메모리 제한 256MB

// 입력
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : './input.txt')
  .toString()
  .trim()
  .split('\n');

function solution(input) {
  // 단어 개수
  const N = +input.shift();
  const inputedWords = {};
  const tmp = input.filter((word) => {
    // 처음 들어오는 단어는 추가
    if (!inputedWords[word]) {
      inputedWords[word] = 1;
      return true;
    }
    // 중복되는 단어 제외
    return false;
  });

  tmp.sort((a, b) => {
    // 길이를 비교
    if (a.length !== b.length) {
      return a.length - b.length;
    }

    // 사전 순 비교
    if (a < b) {
      return -1;
    } else {
      return 1;
    }
  });

  ans = tmp.join('\n');
  console.log(ans.trimEnd());
}

solution(input);
