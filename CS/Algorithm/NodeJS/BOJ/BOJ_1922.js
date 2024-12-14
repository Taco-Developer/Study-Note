function solution(input) {
  const N = +input[0];
  const M = +input[1];

  // 비용을 기준으로 각 연결선 내림차순
  const lines = input
    .slice(2)
    .map((row) => row.trim().split(' ').map(Number))
    .sort((a, b) => a[2] - b[2]);

  // rootComputer[i] => i번 컴퓨터의 root
  const rootComputer = Array.from({ length: N + 1 }, (_, idx) => idx);

  // 해당하는 rootComputer 찾기
  const getRoot = (computerNum) => {
    if (rootComputer[computerNum] === computerNum) return computerNum;
    return getRoot(rootComputer[computerNum]);
  };

  // 각 루트 컴퓨터를 연결하기
  const connect = (root1, root2) => {
    if (root1 <= root2) rootComputer[root2] = root1;
    else rootComputer[root1] = root2;
  };

  let cnt = 0;
  let answer = 0;
  for (let i = 0; i < M; i++) {
    if (cnt === N - 1) break;

    const [a, b, c] = lines[i];

    const aRoot = getRoot(a);
    const bRoot = getRoot(b);

    // root가 다른 경우 연결되지 않았음
    if (aRoot !== bRoot) {
      cnt++;
      answer += c;
      connect(aRoot, bRoot);
    }
  }

  console.log(answer);
}

const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
