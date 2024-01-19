// 전위 순회
function preorder(node, ans) {
  if (node === '.') return;

  ans[0] += node;
  preorder(tree[node][0], ans);
  preorder(tree[node][1], ans);
}

// 중위 순회
function inorder(node, ans) {
  if (node === '.') return;

  inorder(tree[node][0], ans);
  ans[1] += node;
  inorder(tree[node][1], ans);
}

// 후위 순회
function postorder(node, ans) {
  if (node === '.') return;

  postorder(tree[node][0], ans);
  postorder(tree[node][1], ans);
  ans[2] += node;
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

// 노드 개수
const N = +input[0];

// 트리 저장
const tree = {};
for (let i = 1; i <= N; i++) {
  const [node, left, right] = input[i].trim().split(' ');
  tree[node] = [left, right];
}

const ans = Array(3).fill('');

// 전위, 중위, 후위 순으로 순회
for (const order of [preorder, inorder, postorder]) {
  order('A', ans);
}

console.log(ans.join('\n'));
