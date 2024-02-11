// 이진 검색 트리
const preOrder = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number);

const ans = [];
postOrder(0, preOrder.length - 1);
console.log(ans.join('\n'));

// 루트 키보다 처음으로 큰 값이 나오는 위치가 오른쪽 서브 트리의 시작점
// 왼쪽 서브 트리는 루트 + 1부터 오른쪽 서브 트리 시작점 - 1
// 오른쪽 서브 트리는 오른쪽 서브 트리 시작점부터 끝까지
// 왼쪽 서브 트리를 찾고 오른쪽 서브 트리를 찾은 다음 루트를 출력하면 후위 순회
function postOrder(start, end) {
  // 루트 위치가 마지막 노드 위치보다 뒤에 있다면 종료 (없는 서브 트리)
  if (start > end) return;

  // 중간점 = 왼쪽 서브 트리 마지막 + 1 = 오른쪽 서브 트리 시작점
  let mid = start + 1;
  // 루트보다 처음으로 커지는 경우 찾기
  while (mid <= end && preOrder[mid] < preOrder[start]) {
    mid++;
  }

  // 왼쪽 -> 오른쪽 -> 루트 (후위 순회)
  // 왼쪽 서브 트리
  postOrder(start + 1, mid - 1);
  // 오른쪽 서브 트리
  postOrder(mid, end);
  // 루트
  ans.push(preOrder[start]);
}
