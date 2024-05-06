function solution(k, dungeons) {
  let answer = 0;

  // nowK: 현재 남은 피로도, cnt: 던전 탐험 횟수 & 현재 확정하려는 던전 인덱스
  const getMaxCnt = (nowK, cnt) => {
    answer = Math.max(answer, cnt);

    for (let i = cnt; i < dungeons.length; i++) {
      // 현재 던전을 갈 수 있는 경우
      if (nowK >= dungeons[i][0]) {
        // 남은 피로도
        const left = nowK - dungeons[i][1];
        // cnt 위치에 있는 던전과 가려는 던전 위치 교환
        [dungeons[cnt], dungeons[i]] = [dungeons[i], dungeons[cnt]];
        getMaxCnt(left, cnt + 1);
        // 교환 되돌리기
        [dungeons[cnt], dungeons[i]] = [dungeons[i], dungeons[cnt]];
      }
    }
  };

  getMaxCnt(k, 0, 0);

  return answer;
}
