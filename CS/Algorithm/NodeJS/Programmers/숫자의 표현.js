// 투포인터 활용
function solution(n) {
  // n하나만 있는 경우로 초기화
  let answer = 1;
  
  let sum = 1;
  let left = 1;
  let right = 1;
  
  // 가장 작은 값이 n / 2보다 크다면 n 1개만 있는 경우를 제외한 합으로 n이 되는 경우는 없음
  while (left <= n / 2) {
      if (sum < n) {
          sum += ++right;
          continue;
      }
      
      if (sum === n) answer++;
      sum -= left++;
  }
  
  return answer;
}

// 수학 공식 활용
// 0 < a <= n, k > 0
// a + (a+1) + (a + 2) + ... + (a + k - 1) = n
// ka + k(k+1)/2 - 1 = n
// a = n/k - (k-1)/2
// k => n의 약수, 홀수
function solution(n) {
  let answer = 0;
  for (let k = 1; k <= n; k += 1) {
      const a = n/k - (k-1)/2;
      if (a <= 0) break;
      if (Number.isInteger(a)) answer++;
  }
  return answer;
}