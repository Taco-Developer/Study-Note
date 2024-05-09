function solution(n, t, m, p) {
  // 튜브의 순서를 저장
  const tubeTurns = [];
  for (let i = 0; i < t; i++) {
    tubeTurns.push(m * i + p - 1);
  }

  // 모든 사람이 t번 말할 수 있는 길이로 숫자를 미리 진법 변환해서 저장
  let numbers = '';
  for (let number = 0; numbers.length <= t * m; number++) {
    numbers += number.toString(n);
  }

  // 튜브의 차례에 해당하는 숫자만 뽑아서 출력
  return tubeTurns.map((turn) => numbers[turn].toUpperCase()).join('');
}
