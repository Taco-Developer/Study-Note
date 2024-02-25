// 용액

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

solve(input);

function solve(input) {
  // 용액 개수
  const N = +input[0];

  // 용액 특성 정보
  const data = input[1].trim().split(' ').map(Number);

  let start = 0;
  let end = N - 1;
  const ans = [];

  // 산성 용액만 있는 경우
  if (data[start] > 0) {
    ans[0] = data[start];
    ans[1] = data[start + 1];
  } 
  // 알칼리성 용액만 있는 경우
  else if (data[end] < 0) {
    ans[0] = data[end - 1];
    ans[1] = data[end];
  } 
  // 둘 모두 있는 경우
  else {
    let min = Infinity;

    while (start < end) {
      const sum = data[start] + data[end];

      if (Math.abs(sum) < min) {
        ans[0] = data[start];
        ans[1] = data[end];
        min = Math.abs(sum);
      }

      // 0이 만들어진 경우 종료
      if (min === 0) break;

      // 두 용액의 합이 0보다 작다면 start + 1 => 커져야함
      if (sum < 0) {
        start++;
      } 
      // 합이 0보다 크다면 end - 1 => 작아져야함
      else {
        end--;
      }
    }
  }

  console.log(ans.join(' '));
}
