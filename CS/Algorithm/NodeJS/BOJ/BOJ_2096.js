let inputIdx = -1;
// N : 줄의 개수
let N = 0;
// 위치별 [최솟값, 최댓값]
let min;
let max;

require('readline')
  .createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  .on('line', (input) => {
    inputIdx++;

    if (inputIdx === 0) {
      N = +input;
      return;
    }

    const nums = input.trim().split(' ').map(Number);

    // 처음엔 입력값 그래도 최솟값, 최댓값
    if (inputIdx === 1) {
      min = [nums[0], nums[1], nums[2]];
      max = [nums[0], nums[1], nums[2]];
      return;
    }

    // 최솟값
    let temp = [];
    temp[0] = Math.min(min[0], min[1]) + nums[0];
    temp[1] = Math.min(...min) + nums[1];
    temp[2] = Math.min(min[1], min[2]) + nums[2];
    min = [...temp];

    // 최댓값
    temp = [];
    temp[0] = Math.max(max[0], max[1]) + nums[0];
    temp[1] = Math.max(...max) + nums[1];
    temp[2] = Math.max(max[1], max[2]) + nums[2];
    max = temp;

    if (inputIdx === N) {
      console.log(Math.max(...max), Math.min(...min));
      process.exit();
    }
  });
