class Queue {
  nodes = [];
  headIdx = 0;
  tailIdx = 0;

  get length() {
    return this.tailIdx - this.headIdx;
  }

  get first() {
    if (this.length === 0) return null;
    return this.nodes[this.headIdx];
  }

  push(node) {
    this.nodes[this.tailIdx++] = node;
  }

  pop() {
    if (this.length === 0) return null;
    return this.nodes[this.headIdx++];
  }
}

// 빙하 정보를 미리 저장
function solution(input) {
  const [N, M] = input[0].split(' ').map(Number);

  // 바다 정보
  const seaData = input
    .slice(1)
    .map((row) => row.trim().split(' ').map(Number));

  // 빙하 정보(각 빙하의 위치)
  const icebergData = new Queue();
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < M; c++) {
      if (seaData[r][c]) icebergData.push([r, c]);
    }
  }

  // 확인한 빙하 체크(현재 확인 중인 연도와 같으면 확인)
  const visited = Array.from({ length: N }, () => Array(M).fill(-1));

  // 상하좌우 방향 전환
  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];

  // 빙하가 분리되었는지 확인하는 함수
  const checkIsSplited = (year) => {
    let notCheckedIceberg = icebergData.length;

    const nextIceberg = new Queue(); // 다음에 확인할 빙하

    const now = icebergData.first;
    nextIceberg.push(now);
    visited[now[0]][now[1]] = year;

    while (nextIceberg.length) {
      const [r, c] = nextIceberg.pop();
      notCheckedIceberg--;

      for (i = 0; i < 4; i++) {
        const nr = r + dr[i];
        const nc = c + dc[i];

        if (
          nr < 0 || // 범위를 벗어난 경우
          nr >= N ||
          nc < 0 ||
          nc >= M ||
          visited[nr][nc] === year || // 이미 확인한 경우
          seaData[nr][nc] === 0 // 바다인 경우
        )
          continue;

        visited[nr][nc] = year;
        nextIceberg.push([nr, nc]);
      }
    }

    return notCheckedIceberg !== 0;
  };

  let answer = 0; // 지난 시간
  let nowIcebergCnt = icebergData.length; // 현재 빙하 개수
  let isSplited = nowIcebergCnt ? checkIsSplited(answer) : false; // 빙하 분리 여부

  while (!isSplited && nowIcebergCnt) {
    answer++;

    const sinkCnts = []; // 빙하가 가라앉는 정도를 저장한 배열

    // 각 빙하가 가라앉을 정도를 확인
    for (let i = 0; i < nowIcebergCnt; i++) {
      const [r, c] = icebergData.pop();

      let seaCnt = 0; // 인접한 바다 개수

      for (let i = 0; i < 4; i++) {
        const nr = r + dr[i];
        const nc = c + dc[i];
        if (nr < 0 || nr >= N || nc < 0 || nc >= M) continue;
        if (seaData[nr][nc] === 0) seaCnt++;
      }

      sinkCnts.push([r, c, seaCnt]);
    }

    // 빙하 가라앉음
    for (const [r, c, cnt] of sinkCnts) {
      seaData[r][c] = seaData[r][c] - cnt > 0 ? seaData[r][c] - cnt : 0;
      // 남은 빙하 저장
      if (seaData[r][c]) icebergData.push([r, c]);
    }

    // 빙하의 개수가 달라진 경우
    if (nowIcebergCnt !== icebergData.length) {
      isSplited = icebergData.length ? checkIsSplited(answer) : false;
      nowIcebergCnt = icebergData.length;
    }
  }

  console.log(isSplited ? answer : 0);
}

// N, M 반복하며 빙하 확인
function solution2() {
  const [N, M] = input[0].split(' ').map(Number);

  // 바다 정보
  const seaData = input
    .slice(1)
    .map((row) => row.trim().split(' ').map(Number));

  // 확인한 빙하 체크(현재 확인 중인 연도와 같으면 확인)
  const visited = Array.from({ length: N }, () => Array(M).fill(-1));

  // 상하좌우 방향 전환
  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];

  let cnt = 0; // 덩어리 개수
  let answer = 0; // 시간(연수)

  while (true) {
    cnt = 0; // 덩어리 개수 초기화

    const sinkData = []; // 가라앉는 빙하 정보

    for (let r = 0; r < N; r++) {
      for (let c = 0; c < M; c++) {
        // 확인하지 않은 빙하
        if (seaData[r][c] && visited[r][c] !== answer) {
          cnt++; // 덩어리 개수 카운트

          const queue = new Queue();
          queue.push([r, c]);
          visited[r][c] = answer;

          while (queue.length) {
            const [nowR, nowC] = queue.pop();

            let seaCnt = 0; // 인접 바다 개수

            for (let i = 0; i < 4; i++) {
              const nextR = nowR + dr[i];
              const nextC = nowC + dc[i];

              if (
                nextR < 0 ||
                nextR >= N ||
                nextC < 0 ||
                nextC >= M ||
                visited[nextR][nextC] === answer
              )
                continue;

              if (seaData[nextR][nextC] === 0) seaCnt++; // 바다 카운트
              else {
                visited[nextR][nextC] = answer;
                queue.push([nextR, nextC]);
              }
            }

            // 인접한 바다가 있는 경우 sinkData 추가
            if (seaCnt) sinkData.push([nowR, nowC, seaCnt]);
          }
        }
      }
    }

    // 덩어리가 없거나 2개 이상인 경우 종료
    if (cnt >= 2 || cnt === 0) break;

    // 빙하 가라앉음
    for (const [nowR, nowC, sinkCnt] of sinkData) {
      seaData[nowR][nowC] -= sinkCnt;
      if (seaData[nowR][nowC] < 0) seaData[nowR][nowC] = 0;
    }

    answer++;
  }

  console.log(cnt === 0 ? 0 : answer);
}

const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution2(input);
