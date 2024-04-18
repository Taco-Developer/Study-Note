// 유클리드 호제법 활용
// 최대 공약수
// n, m이 있을 때 n과 m의 최대 공약수는 m과 n % m의 최대 공약수와 같음
// n => m, m => n % m으로 업데이트하면서 n % m === 0인 경우 m이 최대 공약수
// 최소 공배수
// n, m의 최소 공배수는 n * m / n과 m의 최대 공약수임
function solution(arr) {
  const getGcd = (n, m) => {
    while (n % m !== 0) {
      [n, m] = [m, n % m];
    }
    return m;
  };

  const getLcm = (n, m) => {
    return (n * m) / getGcd(n, m);
  };

  let answer = arr[0];
  for (let i = 1; i < arr.length; i++) {
    answer = getLcm(answer, arr[i]);
  }
  return answer;
}
