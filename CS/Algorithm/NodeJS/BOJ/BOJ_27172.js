// 수 나누기 게임

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

solve(input);

function solve(input) {
  const N = +input[0];

  // 플레이어 정보
  const players = input[1].trim().split(' ').map(Number);

  // 카드 정보 => index에 해당하는 카드 존재 여부 (1부터 N까지 player index + 1로 저장)
  const cards = [];

  // 카드 최댓값
  let max = 0;
  players.forEach((card, i) => {
    cards[card] = i + 1;
    max = Math.max(max, card);
  });

  const ans = Array(N).fill(0);

  players.forEach((card, i) => {
    let multipleNum = 2;
    while (card * multipleNum <= max) {
      if (cards[card * multipleNum]) {
        ans[i]++;
        // cards엔 player index + 1로 저장되기 때문에 ans에선 -1해서 카운트
        ans[cards[card * multipleNum] - 1]--;
      }

      multipleNum++;
    }
  });

  console.log(ans.join(' '));
}
