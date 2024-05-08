function solution(n, k) {
  const isPrime = (num) => {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  // k진수로 변환 후 0을 기준으로 나눠서 저장
  const checkNums = n.toString(k).split('0').map(Number);
  // 저장된 수에서 소수 개수 찾아서 반환
  return checkNums.filter((num) => isPrime(num)).length;
}
