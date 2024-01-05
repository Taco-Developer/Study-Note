// const inputs = require("fs").readFileSync("test.txt").toString().split("\n");
const inputs = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const sangsCards = {};

inputs[1]
  .trim()
  .split(" ")
  .forEach((card) => {
    if (!sangsCards[card]) {
      sangsCards[card] = 1;
      return;
    }
    sangsCards[card] += 1;
  });

const ans = [];
inputs[3]
  .trim()
  .split(" ")
  .forEach((num) => {
    ans.push(!sangsCards[num] ? 0 : sangsCards[num]);
  });
console.log(ans.join(" "));
