function solution(msg) {
  // dict 초기화
  const dict = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').reduce((dict, now, i) => {
    dict[now] = i + 1;
    return dict;
  }, {});

  const answer = [];

  // 사전의 마지막 번호
  let last = 26;
  // 현재 입력
  let w = '';
  // 확인 중인 위치
  let i = 0;

  while (i < msg.length) {
    w += msg[i];
    i++;

    // 다음 위치에 입력이 있는 경우
    if (i < msg.length) {
      // 다음에 사전에 추가할 글자
      const add = w + msg[i];
      // add가 이미 추가된 경우 반복 재실행
      if (dict[add]) continue;
      // add dict에 마지막 사전 번호 + 1로 추가
      dict[add] = ++last;
    }

    // 현재 입력에 해당하는 색인 출력
    answer.push(dict[w]);
    // 현재 입력 초기화
    w = '';
  }

  return answer;
}
