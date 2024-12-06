function solution(input) {
  const balls = input[1].split(' ').map(Number);

  // 0: 볼 카운트, 1: 1루, 2: 2루, 3: 3루, 4: 홈인(점수)
  const result = [0, 0, 0, 0, 0];

  // 선수 밀어내기
  const pushPlayers = () => {
    // 볼 카운트 초기화 후 타자 1루 이동
    result[0] = 0;
    result[1]++;

    // 1루부터 2명인 곳 하나씩 밀기
    for (let i = 1; i < 4; i++) {
      // 밀 수 없는 경우 종료
      if (result[i] !== 2) break;

      result[i]--;
      result[i + 1]++;
    }
  };

  // 모든 주자 한 칸 이동
  const movePlayers = () => {
    for (let i = 3; i > 0; i--) {
      if (result[i] === 1) {
        result[i]--;
        result[i + 1]++;
      }
    }
  };

  balls.forEach((ball) => {
    // 볼
    if (ball === 1) {
      result[0]++;
      // 볼넷
      if (result[0] === 4) pushPlayers();
    }
    // 몸에 맞음
    else if (ball === 2) pushPlayers();
    // 폭투
    else {
      // 주자 이동
      movePlayers();

      result[0]++;
      // 볼넷
      if (result[0] === 4) {
        result[0] = 0;
        result[1]++;
      }
    }
  });

  console.log(result[4]);
}
const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
