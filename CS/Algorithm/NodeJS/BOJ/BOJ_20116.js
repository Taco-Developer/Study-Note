function solution(input) {
  const [n, L] = input[0].split(' ').map(Number);

  const xi = input[1].trim().split(' ').map(Number);

  let isStable = true;

  let sum = xi[n - 1]; // 현재 확인 중인 상자의 위에 존재하는 상자들의 합

  for (let i = n - 2; i >= 0; i--) {
    // 현재 확인 중인 상자와 바로 위 상자는 붙어있어야 함
    if (xi[i] < xi[i + 1] - L || xi[i] > xi[i + 1] + L) {
      isStable = false;
      break;
    }

    // 현재 확인 중인 상자의 위에 있는 모든 박스의 평균은 현재 상자의 구간 안에 있어야 함
    const average = sum / (n - 1 - i);
    if (average <= xi[i] - L || average >= xi[i] + L) {
      isStable = false;
      break;
    }

    // sum 업데이트
    sum += xi[i];
  }

  console.log(isStable ? 'stable' : 'unstable');
}

const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
