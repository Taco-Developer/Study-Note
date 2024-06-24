function solution(input) {
  const [A, T, target] = input;

  let now = -1;
  let cnt = 0;
  let times = 0;
  while (true) {
    times++;

    // 이번 문장에서 끝나지 않는 경우
    if (T - cnt > times + 3) {
      cnt += times + 3;
      now = (now + 4 + (times + 1) * 2) % A;
      continue;
    }

    // 앞 4칸 보다 뒤에 있는 경우
    if (T - cnt > 2) {
      cnt += 2;
      now = (now + 4) % A;
      if (target === 1) now = (now + times + 1) % A;
      now = (now + T - cnt) % A;
      return now;
    }

    // 앞 4칸에 있는 경우
    if (target === 0) return (now + (T - cnt) * 2 - 1) % A;
    return (now + (T - cnt) * 2) % A;
  }
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number);
console.log(solution(input));
