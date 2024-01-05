// const inputs = require("fs").readFileSync("test.txt").toString().split("\n");
const inputs = require("fs").readFileSync("/dev/stdin").toString().split("\n");

// N : 세로 줄, M : 가로 줄, B : 가지고 있는 블록 수
const [N, M, B] = inputs[0]
  .trim()
  .split(" ")
  .map((num) => Number(num));

// 전체 블록 수
let totlalBlockCnt = B;

// 전체 땅
const land = [];
for (let i = 1; i <= N; i++) {
  const row = inputs[i]
    .trim()
    .split(" ")
    .map((height) => Number(height));
  totlalBlockCnt += row.reduce((prev, current) => prev + current);
  land.push(row);
}

// 가능한 땅의 최대 높이
const maxHeight =
  Math.floor(totlalBlockCnt / (N * M)) >= 256
    ? 256
    : Math.floor(totlalBlockCnt / (N * M));

const ans = { time: totlalBlockCnt * 2, height: maxHeight };

// 목표 높이로 평탄화 작업 시간 확인
const backTrack = (targetHeight) => {
  let time = 0;
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < M; col++) {
      const tmp = land[row][col] - targetHeight;
      time += tmp >= 0 ? tmp * 2 : -tmp;
    }
    if (time > ans.time) {
      return;
    }
  }
  ans.time = time;
  ans.height = targetHeight;
};

// 0부터 최대 높이까지 시간 확인
for (let i = 0; i <= maxHeight; i++) {
  backTrack(i, 0, 0, 0);
}

console.log(`${ans.time} ${ans.height}`);
