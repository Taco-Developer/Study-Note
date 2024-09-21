const VOWELS = 'a i y e o u';
const CONSONANTS = 'b k x z n h d c w g p v j q t s r l m f';

function solution(input) {
  let answer = '';

  // 모음 배열
  const vowels = VOWELS.split(' ');
  const vowelCnt = vowels.length;
  // 자음 배열
  const consonants = CONSONANTS.split(' ');
  const consonantCnt = consonants.length;

  // vowelMap[모음] => 배열에서 인덱스
  const vowelMap = {};
  for (let i = 0; i < vowelCnt; i++) {
    vowelMap[vowels[i]] = i;
  }

  // consonantMap[자음] => 배열에서 인덱스
  const consonantMap = {};
  for (let i = 0; i < consonantCnt; i++) {
    consonantMap[consonants[i]] = i;
  }

  for (let i = 0; i < input.length; i++) {
    const inputCharCode = input[i].charCodeAt();

    // 알파벳이 아닌 경우
    if (
      inputCharCode < 65 ||
      inputCharCode > 122 ||
      (inputCharCode > 90 && inputCharCode < 97)
    ) {
      answer += input[i];
      continue;
    }

    const char = input[i].toLowerCase();
    const isCapital = inputCharCode <= 90 ? true : false; // 대분자 확인
    const isVowel = vowelMap[char] === undefined ? false : true; // 모음 확인

    // 모음인 경우
    if (isVowel) {
      let idx = vowelMap[char] - 3;
      if (idx < 0) idx += vowelCnt;

      answer += isCapital ? vowels[idx].toUpperCase() : vowels[idx];
      continue;
    }

    // 자음인 경우
    let idx = consonantMap[char] - 10;
    if (idx < 0) idx += consonantCnt;

    answer += isCapital ? consonants[idx].toUpperCase() : consonants[idx];
  }
  console.log(answer);
}

const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim();

solution(input);
