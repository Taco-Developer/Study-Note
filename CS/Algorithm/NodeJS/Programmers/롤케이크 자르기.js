function solution(topping) {
  // 잘랐을 때 왼쪽, 오른쪽
  const left = new Set();
  const right = {};
  // 오른쪽 토핑 종류 개수
  let cnt = 0;

  topping.forEach((num) => {
    if (right[num]) {
      right[num]++;
      return;
    }

    right[num] = 1;
    cnt++;
  });

  let answer = 0;
  topping.forEach((num) => {
    // 해당 토핑을 오른쪽에서 빼서 왼쪽에 넣기
    right[num]--;
    left.add(num);

    // 오른쪽에 해당 토핑 개수가 0인 경우 cnt - 1
    if (right[num] === 0) cnt--;

    if (left.size === cnt) answer++;
  });

  return answer;
}
