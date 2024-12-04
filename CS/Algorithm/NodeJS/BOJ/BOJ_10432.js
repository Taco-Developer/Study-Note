function solution(input) {
  const P = +input[0];

  const answer = [];

  for (let i = 1; i <= P; i++) {
    const [testNum, ...nums] = input[i].trim().split(' ').map(Number);

    let islandCnt = 0;

    // 시작 위치 설정
    for (let start = 1; start < 11; start++) {
      if (nums[start] <= nums[start - 1]) continue;
      let min = nums[start];

      // 설정된 시작 다음 위치 확인
      for (let end = start + 1; end < 12; end++) {
        // 다음 위치가 섬을 이루는 모든 수보다 작은 경우 섬 + 1
        if (min > nums[end]) {
          islandCnt++;
          min = nums[end];
        }

        // 다음 숫자가 섬 시작 이전 수보다 작거나 같은 경우 이어서 섬을 이루지 못함
        if (nums[end] <= nums[start - 1]) break;
      }
    }

    answer.push(`${testNum} ${islandCnt}`);
  }

  console.log(answer.join('\n'));
}
const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
