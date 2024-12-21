function solution(input) {
  const YES = 'YES';
  const NO = 'NO';
  const answer = [];

  const [n, m] = input[0].split(' ').map(Number);
  const root = Array.from({ length: n + 1 }, (_, i) => i);

  // num을 원소로 가지는 집합의 첫 원소 반환 함수
  const findRoot = (num) => {
    if (root[num] === num) return num;
    root[num] = findRoot(root[num]);
    return root[num];
  };

  // 두 첫 원소를 가지는 집합을 합치는 함수
  const union = (rootA, rootB) => {
    if (rootA <= rootB) root[rootB] = rootA;
    else root[rootB] = rootA;
  };

  for (let i = 1; i <= m; i++) {
    const [cmd, a, b] = input[i].split(' ').map(Number);
    const rootA = findRoot(a);
    const rootB = findRoot(b);

    // 두 집합 합치기
    if (cmd === 0) {
      if (rootA !== rootB) union(rootA, rootB);
    }
    // 두 집합이 같은 집합인지 확인
    else answer.push(rootA === rootB ? YES : NO);
  }

  console.log(answer.join('\n'));
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath, 'utf-8').toString().trim().split('\n');

solution(input);
