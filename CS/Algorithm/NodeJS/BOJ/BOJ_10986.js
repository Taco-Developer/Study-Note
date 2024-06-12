function solution(input) {
  const [N, M] = input[0].split(' ').map(Number);

  const A = input[1].trim().split(' ').map(Number);
  // 각 위치까지 누적합을 M으로 나눈 나머지를 인덱스로 해당하는 위치 개수 저장
  const lefts = Array(M).fill(0);

  A[0] = A[0] % M;
  lefts[A[0]]++;
  for (let i = 1; i < N; i++) {
    A[i] = (A[i] + A[i - 1]) % M;
    lefts[A[i]]++;
  }

  // lefts[0]는 누적합이 M으로 나눠지는 경우
  let answer = lefts[0];

  // 나머지가 같은 누적합 위치 개수가 2 이상인 경우 두 위치의 사이의 부분 구간합은 M으로 나눠짐
  // i ~ j 부분 구간합 =  j까지 누적합에서 i-1까지 누적합을 뺀 값
  // 나머지가 같기 때문에 뺄 경우 나머지가 0이 됨
  // 해당 위치 중에서 2개를 선택
  for (let i = 0; i < M; i++) {
    if (lefts[i] < 2) continue;
    answer += (lefts[i] * (lefts[i] - 1)) / 2;
  }

  console.log(answer);
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');
solution(input);
