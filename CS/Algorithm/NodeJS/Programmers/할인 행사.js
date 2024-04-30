function solution(want, number, discount) {
  // 원하는 상품과 현재 살 수 있는 상품 비교
  const checkItems = (want, now) => {
    for (const item in want) {
      if (!now[item] || want[item] > now[item]) return false;
    }
    return true;
  };

  // 원하는 상품 Map
  const wantMap = {};
  let totalWantCnt = 0;
  want.forEach((item, i) => {
    wantMap[item] = number[i];
    totalWantCnt += number[i];
  });

  // 현재 살 수 있는 상품 Map
  const nowMap = {};
  for (let day = 0; day < 10; day++) {
    nowMap[discount[day]] = (nowMap[discount[day]] ?? 0) + 1;
  }

  let answer = checkItems(wantMap, nowMap) ? 1 : 0;
  for (let day = 1; day <= discount.length - totalWantCnt; day++) {
    // 이전 아이템 삭제
    nowMap[discount[day - 1]]--;
    // 다음 아이템 추가
    if (day + 9 < discount.length)
      nowMap[discount[day + 9]] = (nowMap[discount[day + 9]] ?? 0) + 1;

    if (checkItems(wantMap, nowMap)) answer++;
  }

  return answer;
}
