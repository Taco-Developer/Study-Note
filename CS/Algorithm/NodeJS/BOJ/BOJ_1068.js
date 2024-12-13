function solution(input) {
  const N = +input[0];
  const removeNodeNum = +input[2]; // 제거할 노드

  const tree = Array.from({ length: N }, () => []);

  let root = -1; // 루트 노드

  input[1]
    .trim()
    .split(' ')
    .forEach((parent, child) => {
      // 숫자로 변환
      parent = +parent;

      // 루트 노드 저장
      if (parent === -1) {
        root = child;
        return;
      }

      // 각 노드의 자식을 저장
      tree[parent].push(child);
    });

  // 루트 노드가 제거된 경우 0 출력
  if (root === removeNodeNum) {
    console.log(0);
    return;
  }

  let answer = 0;

  const nextNodes = [root]; // 다음에 확인할 노드 배열

  while (nextNodes.length !== 0) {
    const now = nextNodes.pop(); // 현재 노드

    let childCnt = 0; // 자식 노드 개수
    for (const next of tree[now]) {
      if (next === removeNodeNum) continue;

      // 자식이 있는 경우 카운트하고 다음에 확인할 노드 배열에 추가
      childCnt++;
      nextNodes.push(next);
    }

    // 리프 노드인 경우 카운트
    if (childCnt === 0) answer++;
  }

  console.log(answer);
}
const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
