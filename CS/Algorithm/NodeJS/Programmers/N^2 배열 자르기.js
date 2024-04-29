// function solution(n, left, right) {
//   const answer = [];
//   let r = Math.floor(left / n);
//   let c = left % n;

//   let er = Math.floor(right / n);
//   let ec = right % n;

//   while (r < er || (r === er && c <= ec)) {
//     if (c === n) {
//       r++;
//       c = 0;
//       continue;
//     }

//     answer.push(r >= c ? r + 1 : c + 1);
//     c++;
//   }

//   return answer;
// }

function solution(n, left, right) {
  const answer = [];

  for (let i = left; i < right + 1; i++) {
    answer.push(Math.max(Math.floor(i / n) + 1, (i % n) + 1));
  }

  return answer;
}
