function solution(input) {
  const [_, M] = input[0].split(' ').map(Number);

  const wordCntMap = {};
  input = input
    .slice(1)
    .filter((word) => word.length >= M)
    .forEach((word) => {
      wordCntMap[word] = (wordCntMap[word] ?? 0) + 1;
    });

  const answer = Object.keys(wordCntMap);
  answer.sort((word1, word2) => {
    if (wordCntMap[word1] > wordCntMap[word2]) return -1;
    if (wordCntMap[word1] < wordCntMap[word2]) return 1;
    if (word1.length > word2.length) return -1;
    if (word1.length < word2.length) return 1;
    if (word1 < word2) return -1;
    if (word1 > word2) return 1;
    return 0;
  });

  return answer.join('\n');
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');
console.log(solution(input));
