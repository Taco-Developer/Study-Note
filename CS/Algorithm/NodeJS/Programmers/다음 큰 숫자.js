function solution(n) {
  // 2진수에서 1의 개수 반환 함수
  function getOneCnt(n) {
    let oneCnt = 0;

    while (n > 0) {
      const left = n % 2;
      if (left === 1) oneCnt++;
      n = Math.floor(n / 2);
    }
    return oneCnt;
  }

  const nOneCnt = getOneCnt(n);
  for (let i = n + 1; i <= n * 2; i++) {
    const oneCnt = getOneCnt(i);
    if (oneCnt === nOneCnt) return i;
  }
}
