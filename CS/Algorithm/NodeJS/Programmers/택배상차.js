function solution(order) {
  const assistContainer = [];
  let now = 1;
  let answer = 0;

  for (const target of order) {
    // 현재 박스가 목표 박스보다 앞에 있는 순서인 경우 보조 컨테이너로 이동
    while (now < target) {
      assistContainer.push(now);
      now++;
    }

    // 현재 박스가 목표 박스인 경우 상차
    if (now === target) {
      answer++;
      now++;
      continue;
    }

    // 보조 컨테이너 마지막 박스가 목표 박스인 경우 상차
    if (assistContainer[assistContainer.length - 1] === target) {
      answer++;
      assistContainer.pop();
      continue;
    }

    // 목표 박스를 넣을 수 없는 경우 반복 종료
    break;
  }

  return answer;
}
