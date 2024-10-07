function solution(input) {
  const answer = [];

  let inputIdx = 0;
  while (true) {
    const [N, M] = input[inputIdx++].split(' ').map(Number);
    if (N === 0 && M === 0) break;

    const playerMap = {}; // key: 선수, value: 점수
    for (let i = 0; i < N; i++) {
      const players = input[inputIdx++].trim().split(' ');
      for (let j = 0; j < M; j++) {
        playerMap[players[j]] = (playerMap[players[j]] ?? 0) + 1;
      }
    }

    // 각 선수들의 번호와 점수를 원소로 가지는 배열(내림차순)
    const playerArray = Object.entries(playerMap).sort((a, b) => b[1] - a[1]);

    // 두 번째 선수가 2등이고 동일한 점수를 가진 선수를 저장
    const secondPlayers = [playerArray[1][0]];
    for (let i = 2; i < playerArray.length; i++) {
      if (playerArray[i][1] !== playerArray[1][1]) break;
      secondPlayers.push(playerArray[i][0]);
    }

    answer.push(secondPlayers.join(' '));
  }

  console.log(answer.join('\n'));
}
const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
