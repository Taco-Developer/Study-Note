function solution(input) {
  const [N, K] = input[0].split(' ').map(Number);

  if (K < 5) return 0;
  else if (K === 26) return N;

  const words = input.slice(1).map((word) => word.trim());
  const left = K - 5;
  let answer = 0;

  const learnedArr = new Array(26).fill(0);
  // a, c, i, n, t
  learnedArr[0] = 1;
  learnedArr[2] = 1;
  learnedArr[8] = 1;
  learnedArr[13] = 1;
  learnedArr[19] = 1;

  const dfs = (index, left) => {
    // 글자를 모두 배운 경우
    if (left === 0) {
      let count = 0;

      for (let i = 0; i < N; i++) {
        let flag = true;

        for (let j = 0; j < words[i].length; j++) {
          if (learnedArr[words[i][j].charCodeAt() - 97] === 0) {
            flag = false;
            break;
          }
        }

        if (flag) count++;
      }

      answer = Math.max(answer, count);
    }

    // 배울 글자 선택
    for (let i = index; i < 26; i++) {
      if (learnedArr[i] === 0) {
        learnedArr[i] = 1;
        dfs(i + 1, left - 1);
        learnedArr[i] = 0;
      }
    }
  };

  dfs(0, left);

  return answer;
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');
console.log(solution(input));
