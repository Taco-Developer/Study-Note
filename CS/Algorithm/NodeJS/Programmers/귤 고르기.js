function solution(k, tangerine) {
  const sizeMap = {};
  tangerine.forEach((size) => {
    sizeMap[size] = (sizeMap[size] ?? 0) + 1;
  });

  const cnts = Object.values(sizeMap).sort((a, b) => b - a);
  let answer = 0;
  for (const cnt of cnts) {
    k -= cnt;
    answer++;
    if (k <= 0) return answer;
  }
}
