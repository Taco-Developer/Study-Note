function solution(s) {
  s = s
    .slice(2, -2)
    .split('},{')
    .map((str) => str.split(',').map(Number))
    .sort((a, b) => a.length - b.length);

  const answer = [];
  const numCheck = {};

  s.forEach((tuple) => {
    tuple.forEach((num) => {
      if (numCheck[num]) return;
      numCheck[num] = true;
      answer.push(num);
    });
  });

  return answer;
}
