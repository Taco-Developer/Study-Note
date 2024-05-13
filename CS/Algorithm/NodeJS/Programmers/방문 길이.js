function solution(dirs) {
  // 방향에 따른 이동
  const direction = {
    U: [1, 0],
    D: [-1, 0],
    R: [0, 1],
    L: [0, -1],
  };

  // 방향에 해당하는 인덱스
  const dirctionIdx = {
    U: 0,
    D: 1,
    R: 2,
    L: 3,
  };

  // 방향의 반대에 해당하는 인덱스
  const reverseIdx = {
    U: 1,
    D: 0,
    R: 3,
    L: 2,
  };

  // 각 위치에서 이동한 방향 저장
  const moveMap = {};
  for (let y = -5; y < 6; y++) {
    for (let x = -5; x < 6; x++) {
      moveMap[`${y}${x}`] = Array(4).fill(0);
    }
  }

  let y = 0;
  let x = 0;
  let answer = 0;

  for (let i = 0; i < dirs.length; i++) {
    const [dy, dx] = direction[dirs[i]];
    const ny = y + dy;
    const nx = x + dx;

    // 범위를 벗어나는 경우 생략
    if (ny < -5 || ny > 5 || nx < -5 || nx > 5) continue;

    // 지나가지 않은 길인 경우
    if (!moveMap[`${y}${x}`][dirctionIdx[dirs[i]]]) {
      answer++;

      // 이동 체크(현재 위치 => 이동 위치, 이동 위치 => 현재 위치)
      moveMap[`${y}${x}`][dirctionIdx[dirs[i]]] = 1;
      moveMap[`${ny}${nx}`][reverseIdx[dirs[i]]] = 1;
    }

    // 현재 위치 업데이트
    y = ny;
    x = nx;
  }

  return answer;
}
