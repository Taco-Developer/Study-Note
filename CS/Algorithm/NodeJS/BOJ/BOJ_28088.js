function solution(input) {
  const [N, M, K] = input[0].split(' ').map(Number);

  const people = Array.from({ length: 2 }, () => Array(N).fill(0));
  for (let i = 1; i <= M; i++) people[0][+input[i]] = 1;

  let checkIdx = 0;
  for (let i = 0; i < K; i++) {
    const next = (checkIdx + 1) % 2;

    // 0번 위치 확인
    if (people[checkIdx][N - 1] + people[checkIdx][1] === 1)
      people[next][0] = 1;
    else people[next][0] = 0;

    // 1번부터 N-2번 위치 확인
    for (let j = 1; j < N - 1; j++) {
      if (people[checkIdx][j - 1] + people[checkIdx][j + 1] === 1)
        people[next][j] = 1;
      else people[next][j] = 0;
    }

    // N-1번 위치 확인
    if (people[checkIdx][N - 2] + people[checkIdx][0] === 1)
      people[next][N - 1] = 1;
    else people[next][N - 1] = 0;

    // for (let j = 0; j < N; j++) {
    //   const prevNum = j === 0 ? N - 1 : j - 1;
    //   const nextNum = j === N - 1 ? 0 : j + 1;
    //   if (people[checkIdx][prevNum] + people[checkIdx][nextNum] === 1)
    //     people[next][j] = 1;
    //   else people[next][j] = 0;
    // }

    checkIdx = next;
  }

  console.log(people[checkIdx].reduce((cnt, isShouting) => cnt + isShouting));
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');
solution(input);
