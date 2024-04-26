function solution(elements) {
  const answer = new Set();

  for (let i = 0; i < elements.length; i++) {
    let sum = elements[i];
    answer.add(sum);
    for (let cnt = 1; cnt < elements.length - 1; cnt++) {
      sum += elements[(i + cnt) % elements.length];
      answer.add(sum);
    }
  }

  answer.add(
    elements.reduce((acc, cur) => acc + cur),
    0
  );

  return answer.size;
}
