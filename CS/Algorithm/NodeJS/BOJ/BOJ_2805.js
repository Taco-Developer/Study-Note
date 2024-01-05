const inputs = require('fs').readFileSync('/dev/stdin').toString().split('\n');

const [N, M] = inputs[0]
  .trim()
  .split(' ')
  .map((num) => Number(num));

const trees = inputs[1]
  .trim()
  .split(' ')
  .map((tree) => Number(tree));

const maxTreeHeight = Math.max(...trees);
let ans = 0;

// 반복문
// const findMaxTreeHeight = (min, max) => {
//   while (min <= max) {
//     const mid = Math.floor((min + max) / 2);
//     let leftHeights = 0;
//     trees.forEach((tree) => {
//       if (tree > mid) {
//         leftHeights += tree - mid;
//       }
//     });
//     if (leftHeights >= M) {
//       ans = ans < mid ? mid : ans;
//       min = mid + 1;
//       continue;
//     }
//     max = mid - 1;
//   }
// };

// 재귀
const findMaxTreeHeight = (min, max) => {
  if (min > max) {
    return;
  }

  const mid = Math.floor((min + max) / 2);
  let leftHeights = 0;
  trees.forEach((tree) => {
    if (tree > mid) {
      leftHeights += tree - mid;
    }
  });
  if (leftHeights >= M) {
    ans = ans < mid ? mid : ans;
    findMaxTreeHeight(mid + 1, max);
    return;
  }
  findMaxTreeHeight(min, mid - 1);
};

findMaxTreeHeight(0, maxTreeHeight);

console.log(ans);
