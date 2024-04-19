function solution(n) {
  let answer = 0;

  while (n > 0) {
    if (n & 1) answer++;
    n >>= 1;
  }

  return answer;
}
