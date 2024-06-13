function solution(input) {
  const [N, M] = input[0].split(' ').map(Number);

  const arr = [];
  arr.push(Array(M + 1).fill(0));
  for (let i = 1; i <= N; i++) {
    arr.push([0, ...input[i].trim().split(' ').map(Number)]);
  }

  // 각 행에서 누적합 저장
  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= M; j++) {
      arr[i][j] += arr[i][j - 1];
    }
  }

  let answer = '';
  input.slice(N + 2).forEach((range) => {
    const [i, j, x, y] = range.split(' ').map(Number);

    let sum = 0;
    for (let row = i; row <= x; row++) {
      // 각 행의 j ~ y 부분 구간 합 더하기
      sum += arr[row][y] - arr[row][j - 1];
    }
    answer += `${sum}\n`;
  });

  console.log(answer.trimEnd());
}

function solution2(input) {
  const [N, M] = input[0].split(' ').map(Number);

  // arr[i][j] => (0, 0)부터 (i, j)까지 구간 합
  const arr = input
    .slice(1, N + 1)
    .map((row) => row.trim().split(' ').map(Number));

  for (let i = 1; i < M; i++) arr[0][i] += arr[0][i - 1];
  for (let i = 1; i < N; i++) arr[i][0] += arr[i - 1][0];

  for (let i = 1; i < N; i++) {
    for (let j = 1; j < M; j++) {
      arr[i][j] += arr[i][j - 1] + arr[i - 1][j] - arr[i - 1][j - 1];
    }
  }

  let answer = '';
  input.slice(N + 2).forEach((range) => {
    const [i, j, x, y] = range.split(' ').map((num) => +num - 1);

    // (0, 0)부터 (x, y)까지 구간 합에서
    // (0, 0)부터 (i-1, y)까지 구간 합과 (0, 0)부터 (x, j-1)까지 구간 합을 빼고
    // (0, 0)부터 (i-1, j-1)까지 구간 합 더하기 => (i-1, y)까지 구간 합과 (x, j-1)까지 구간 합에서 중복해서 뺐으므로 더해줌
    let sum = arr[x][y];
    if (i > 0) sum -= arr[i - 1][y];
    if (j > 0) sum -= arr[x][j - 1];
    if (i > 0 && j > 0) sum += arr[i - 1][j - 1];
    answer += `${sum}\n`;
  });

  console.log(answer.trimEnd());
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');
solution2(input);
