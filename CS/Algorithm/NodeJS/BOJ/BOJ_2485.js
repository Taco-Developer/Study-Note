function solution(positions) {
  const getGcd = (num1, num2) => {
    while (num2 !== 0) {
      [num1, num2] = [num2, num1 % num2];
    }

    return num1;
  };

  // 각 가로수 간 거리를 저장
  const distances = [];
  for (let i = 1; i < positions.length; i++) {
    distances.push(positions[i] - positions[i - 1]);
  }

  // 모든 가로수 간 거리에서 최대 공약수 찾기
  let targetDistance = distances[0];
  for (let i = 1; i < distances.length; i++) {
    targetDistance = getGcd(targetDistance, distances[i]);
  }

  // 최대 공약수로 나온 거리에 맞게 가로수 추가로 심기
  let answer = 0;
  distances.forEach((distance) => {
    answer += distance / targetDistance - 1;
  });

  return answer;
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number);
console.log(solution(input.slice(1)));
