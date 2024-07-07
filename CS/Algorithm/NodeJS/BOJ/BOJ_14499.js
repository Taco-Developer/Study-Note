function solution(input) {
  const [N, M, y, x, K] = input[0].split(' ').map(Number);

  // 0 => back, 1 => top, 2 => front, 3 => bottom, 4 => left, 5 => right
  const dice = Array(6).fill(0);
  const directionMap = {
    1: [0, 1],
    2: [0, -1],
    3: [-1, 0],
    4: [1, 0],
  };

  const mapData = input
    .slice(1, N + 1)
    .map((row) => row.trim().split(' ').map(Number));

  // 주사위 굴리고 윗면 반환
  const roll = (cmd, y, x) => {
    // 주사위 굴리기
    if (cmd === '1')
      [dice[1], dice[3], dice[4], dice[5]] = [
        dice[4],
        dice[5],
        dice[3],
        dice[1],
      ];
    else if (cmd === '2')
      [dice[1], dice[3], dice[4], dice[5]] = [
        dice[5],
        dice[4],
        dice[1],
        dice[3],
      ];
    else if (cmd === '3')
      [dice[0], dice[1], dice[2], dice[3]] = [
        dice[1],
        dice[2],
        dice[3],
        dice[0],
      ];
    else
      [dice[0], dice[1], dice[2], dice[3]] = [
        dice[3],
        dice[0],
        dice[1],
        dice[2],
      ];

    // 아랫면과 지도 확인 후 업데이트
    if (mapData[y][x] === 0) mapData[y][x] = dice[3];
    else {
      dice[3] = mapData[y][x];
      mapData[y][x] = 0;
    }

    // 윗면 반환
    return dice[1];
  };

  // 명령어 배열
  const cmds = input[N + 1].trim().split(' ');

  const answer = [];
  const now = [y, x];
  for (const cmd of cmds) {
    const [dy, dx] = directionMap[cmd];
    const ny = now[0] + dy;
    const nx = now[1] + dx;

    if (ny < 0 || ny >= N || nx < 0 || nx >= M) continue;

    answer.push(roll(cmd, ny, nx));
    now[0] = ny;
    now[1] = nx;
  }

  return answer.join('\n');
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');
console.log(solution(input));
