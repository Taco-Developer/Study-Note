function solution(input) {
  const N = +input[0];
  const data = input[1].trim();

  let answer = 0;

  // 피라미드 구조로 구슬이 쌓이므로 모든 피라미드를 이루는 구슬의 개수 더하기
  // 피라미드 하나를 이루는 구슬의 개수는 최상단 1부터 최하단 피라미드 길이까지 모두 더한 값
  let cnt = 0;
  for (let i = 0; i < N; i++) {
    // 피라미드의 최하단 길이 구하기
    if (data[i] === '1') {
      cnt++;
      continue;
    }

    // 하나의 피라미드가 끝나는 경우
    // 구슬 모두 더하기
    answer += (cnt * (cnt + 1)) / 2;
    cnt = 0;
  }

  // 마지막이 1인 경우 구슬이 for문 안에서 구슬 개수가 더해지지 않으므로 더하기
  answer += (cnt * (cnt + 1)) / 2;

  console.log(answer);
}
const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
