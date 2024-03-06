// 사이클 게임
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

solve(input);

function solve(input) {
  // n: 점의 개수, m: 진행된 순서
  const [n, m] = input[0].split(' ').map(Number);

  const parents = Array.from({ length: n }, (_, i) => i);

  for (let turn = 1; turn <= m; turn++) {
    const [v, w] = input[turn].split(' ').map(Number);

    const rv = findParent(v);
    const rw = findParent(w);

    if (rv === rw) {
      console.log(turn);
      return;
    }

    union(rv, rw);
  }

  console.log(0);

  // 부모를 찾는 함수
  function findParent(v) {
    if (parents[v] === v) return v;
    return (parents[v] = findParent(parents[v]));
  }

  // 두 점을 연결하는 함수
  function union(rv, rw) {
    if (rv < rw) {
      parents[rw] = rv;
    } else {
      parents[rv] = rw;
    }
  }
}
