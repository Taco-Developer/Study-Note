function solution(input) {
  // 자료구조 개수
  const N = +input[0];
  // 자료구조 종류
  const structures = input[1].trim().split(' ');
  // 자료구조에 저장된 원소
  const structureElements = input[2].trim().split(' ');
  // 삽입할 수열의 길이
  const M = +input[3];
  // 삽입할 원소
  const insertElements = input[4].trim().split(' ');

  const answer = [];

  // 스택의 경우 삽입된 값이 그대로 다시 반환되고 큐는 저장된 값이 반환되므로
  // 큐에 저장된 값이 자료구조 순서의 역순으로 출력됨
  // 모든 큐에서 출력되었다면 삽입된 순서로 남은 개수가 출력됨 => 총 삽입된 원소의 개수만큼 출력

  // 마지막 큐부터 처음 큐까지 저장된 원소 출력
  // 출력된 원소의 개수가 삽인된 원소의 개수와 같아지면 중단
  for (let i = N - 1; answer.length < M && i >= 0; i--) {
    if (structures[i] === '1') continue;
    answer.push(structureElements[i]);
  }

  // 출력된 원소의 개수가 삽입된 수열의 길이와 같아질 때까지 삽입된 수열의 처음부터 출력
  for (let i = 0; answer.length < M && i < M; i++) {
    answer.push(insertElements[i]);
  }

  return answer.join(' ');
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .split('\n');
console.log(solution(input));
