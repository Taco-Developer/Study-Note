function solution(input) {
  const decode = {
    '@': 'a',
    '[': 'c',
    '!': 'i',
    ';': 'j',
    '^': 'n',
    0: 'o',
    7: 't',
  };

  const N = +input[0];
  const answer = [];

  for (let i = 1; i <= N; i++) {
    const word = input[i].trim(); // 암호화된 단어
    const wordLen = word.length;

    let idx = 0; // 확인 중인 위치
    let cnt = 0; // 암호화된 단어 개수
    let decodedWord = ''; // 본래의 단어

    while (idx < wordLen) {
      const now = word[idx++];

      if (now === '\\') {
        // \' 확인
        if (word[idx] === "'") {
          decodedWord += 'v';
          idx++;
          cnt++;
          continue;
        }

        // \\' 확인
        if (word[idx] === '\\' && word[idx + 1] === "'") {
          decodedWord += 'w';
          idx += 2;
          cnt++;
          continue;
        }
      }

      // \', \\'가 아닌 다르게 암호화된 경우
      if (decode[now]) {
        decodedWord += decode[now];
        cnt++;
        continue;
      }

      // 암호화되지 않은 경우
      decodedWord += now;
    }

    // 암호화된 단어 개수가 본래 단어 길이의 절반 이상인 경우 확인
    answer.push(
      decodedWord.length <= cnt * 2 ? "I don't understand" : decodedWord
    );
  }

  console.log(answer.join('\n'));
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

solution(input);
