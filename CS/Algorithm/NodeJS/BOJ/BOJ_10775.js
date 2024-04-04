// 공항

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

solve();

function solve() {
  const G = Number(input[0]);
  const P = Number(input[1]);
  const planes = input.slice(2, P + 2).map(Number);

  // gates[i] => 1 ~ i 게이트 중 도킹 가능한 게이트 번호
  // gates[i] => 0이면 1 ~ i 게이트는 모두 이미 도킹이 완료됨
  const gates = [];
  for (let i = 0; i < G + 1; i++) {
    gates.push(i);
  }

  let answer = 0;
  for (let i = 0; i < P; i++) {
    const gateNum = find(planes[i]);
    if (gateNum === 0) break;
    // 현재 게이트 번호는 도킹이 끝났으므로 이전 게이트로 유도
    gates[gateNum]--;
    answer++;
  }

  console.log(answer);

  // 도킹 가능한 게이트 번호 찾기
  function find(num) {
    if (num === gates[num]) return num;
    return (gates[num] = find(gates[num]));
  }
}
