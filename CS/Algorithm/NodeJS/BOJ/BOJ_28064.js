function solution(input) {
  // 연결할 수 있는지 여부를 반환하는 함수
  const isConnected = (word1, word2) => {
    const word1Len = word1.length;
    const word2Len = word2.length;
    const maxLen = Math.min(word1Len, word2Len);

    for (let i = 1; i <= maxLen; i++) {
      // word1의 앞과 word2의 끝이 같거나 word2의 앞과 word1의 끝이 같은 경우 연결 가능
      if (
        word1.slice(0, i) === word2.slice(word2Len - i) ||
        word2.slice(0, i) === word1.slice(word1Len - i)
      )
        return true;
    }

    return false;
  };

  const N = +input[0];

  let answer = 0;

  // 두 단어를 선택해서 확인
  for (let i = 1; i <= N - 1; i++) {
    for (let j = i + 1; j <= N; j++) {
      if (isConnected(input[i], input[j])) answer++;
    }
  }

  console.log(answer);
}
const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
