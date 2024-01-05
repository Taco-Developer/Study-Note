const inputs = require("fs")
  .readFileSync("test.txt")
  .toString()
  .trim()
  .split("\n");

const T = Number(inputs[0]);

// 2차원 배열 0으로 초기화
const building = [];

for (let i = 0; i < 15; i++) {
  building.push(Array(15).fill(0));
}

// 0층 초기화
for (let i = 0; i < 15; i++) {
  building[0][i] = i;
}

const findPeopleCnt = (k, n) => {
  // 1호는 모두 1
  if (n === 1) {
    return 1;
  }

  // 저장된 값이 있으면 사용
  if (!!building[k][n]) {
    return building[k][n];
  }

  // 현재 집에 사는 사람 = 앞 호에 사는 사람 + 아랫 층에 사는 사람
  // 찾은 값을 배열에 저장
  building[k][n] = findPeopleCnt(k, n - 1) + findPeopleCnt(k - 1, n);
  return building[k][n];
};

for (let i = 1; i < inputs.length; i += 2) {
  const k = Number(inputs[i]);
  const n = Number(inputs[i + 1]);
  console.log(findPeopleCnt(k, n));
}

// const T = Number(inputs[0]);

// const findPeopleCnt = (k, n) => {
//   // 0층
//   if (k === 0) {
//     return n;
//   }

//   // 1호
//   if (n === 1) {
//     return 1;
//   }

//   // 현재 집에 사는 사람 = 앞 호에 사는 사람 + 아랫 층에 사는 사람
//   return findPeopleCnt(k, n - 1) + findPeopleCnt(k - 1, n);
// };

// for (let i = 1; i < inputs.length; i += 2) {
//   const k = Number(inputs[i]);
//   const n = Number(inputs[i + 1]);
//   console.log(findPeopleCnt(k, n));
// }
