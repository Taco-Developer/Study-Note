function solution(input) {
  // 알파벳이 나오는 모든 자릿수를 더해서 저장
  // GCF, ACDEB
  // A: 10000, B: 1, C: 1010, D: 100, E: 10, F: 1, G: 100
  const priorities = {};
  input.slice(1).forEach((word) => {
    word = word.trim();
    let position = 0;
    for (let i = word.length - 1; i >= 0; i--) {
      priorities[word[i]] = (priorities[word[i]] ?? 0) + 10 ** position++;
    }
  });

  // 자릿수의 합을 기준으로 내림차순 후 각 합에 9부터 내려가면서 곱해서 더하기
  return Object.values(priorities)
    .sort((a, b) => b - a)
    .reduce((answer, priority, i) => answer + priority * (9 - i), 0);
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');
console.log(solution(input));
