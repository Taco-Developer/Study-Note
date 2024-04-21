function solution(n, words) {
  const wordMap = {};
  const peopleCnt = Array(n).fill(0);
  peopleCnt[0]++;
  wordMap[words[0]] = true;

  for (let i = 1; i < words.length; i++) {
    peopleCnt[i % n]++;
    if (wordMap[words[i]] || words[i - 1].slice(-1) !== words[i][0])
      return [(i % n) + 1, peopleCnt[i % n]];
    wordMap[words[i]] = true;
  }

  return [0, 0];
}
