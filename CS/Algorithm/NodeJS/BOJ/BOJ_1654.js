// const inputs = require("fs").readFileSync("test.txt").toString().split("\n");
const inputs = require("fs").readFileSync("/dev/stdin").toString().split("\n");

// K : 가지고 있는 랜선 개수, N: 필요한 랜선 개수
const [K, N] = inputs[0].split(" ").map((num) => Number(num));

// 가지고 있는 랜선의 전체 길이 합
let totalLength = 0;
// 가지고 있는 랜선의 길이를 저장한 배열
const lanLength = [];
for (let i = 1; i <= K; i++) {
  const length = Number(inputs[i]);
  totalLength += length;
  lanLength.push(length);
}

let ans = 0;

// 전체 길이 합을 가지고 만든 가능한 최대 랜선 길이
const maxLength = Math.floor(totalLength / N);
// 이분탐색으로 가능한 최대 랜선 길이를 찾기
const binarySearch = (max) => {
  let min = 0;
  while (min <= max) {
    const mid = Math.floor((min + max) / 2);
    let lanCnt = 0;
    lanLength.forEach((lan) => {
      lanCnt += Math.floor(lan / mid);
    });
    // 랜선의 개수가 모자라면 길이를 줄이기
    if (lanCnt < N) {
      max = mid - 1;
      continue;
    }
    // 래선의 개수가 충분하면 길이를 늘려서 다시 확인
    min = mid + 1;
    ans = ans >= mid ? ans : mid;
  }
};

binarySearch(maxLength);
console.log(ans);
