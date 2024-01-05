// const [A, B, V] = require("fs")
//   .readFileSync("test.txt")
//   .toString()
//   .split(" ")
//   .map((input) => Number(input));
const [A, B, V] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .split(" ")
  .map((input) => Number(input));

// 하루동안 움직이는 높이 = A - B
// 정상에 도착하면 아래로 미끄러지지 않으니 도착해야하는 높이 = V - B
console.log(Math.ceil((V - B) / (A - B)));
