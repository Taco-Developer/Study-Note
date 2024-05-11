function solution(word) {
  const alphabets = ['A', 'E', 'I', 'O', 'U'];
  const wordMap = {};
  let cnt = 1;

  const saveWords = (length, word) => {
    if (length === 5) return;
    for (let i = 0; i < 5; i++) {
      wordMap[word + alphabets[i]] = cnt++;
      saveWords(length + 1, word + alphabets[i]);
    }
  };
  saveWords(0, '');

  return wordMap[word];
}
