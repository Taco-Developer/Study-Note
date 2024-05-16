function solution(land) {
  // 행의 개수;
  const N = land.length;

  // answer[i][j] => i행 j열에 도착했을 때 최댓값, 첫 행은 그대로 저장
  const answer = [land[0]];

  // 두 번째 행부터 최댓값 저장
  for (let i = 1; i < N; i++) {
    answer[i] = [];
    for (let j = 0; j < 4; j++) {
      answer[i][j] =
        Math.max(...answer[i - 1].slice(0, j), ...answer[i - 1].slice(j + 1)) +
        land[i][j];
    }
  }

  return Math.max(...answer[N - 1]);
}
