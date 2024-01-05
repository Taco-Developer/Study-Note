// 전체 난이도에서 필요없는 난이도 제외 함수
function removeDifficulty(isFront, removeCnt, difficulties) {
  let left = removeCnt;

  for (
    let i = isFront ? 1 : 30;
    isFront ? i <= 30 : i >= 1;
    isFront ? i++ : i--
  ) {
    if (difficulties[i] === 0) continue;

    if (difficulties[i] > left) {
      difficulties[i] -= left;
      return;
    } else {
      left -= difficulties[i];
      difficulties[i] = 0;
    }
  }
}

// 입력
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((number) => Number(number));

// 입력된 난이도 개수
const n = input[0];

// 난이도 입력이 없는 경우
if (n === 0) console.log(0);

// 난이도 입력이 있는 경우
if (n !== 0) {
  // 앞, 뒤로 제외할 난이도 수
  const removeCnt = Math.round(n * 0.15);

  // 입력받은 난이도 저장
  const difficulties = Array(31).fill(0);
  for (let i = 1; i < input.length; i++) {
    difficulties[input[i]] += 1;
  }

  // 앞, 뒤로 난이도 제거
  removeDifficulty(true, removeCnt, difficulties);
  removeDifficulty(false, removeCnt, difficulties);

  // 남아있는 난이도의 합
  const sum = difficulties.reduce((acc, current, index) => {
    if (current === 0) return acc;
    return acc + index * current;
  }, 0);

  // 결정한 문제 난이도
  console.log(Math.round(sum / (n - removeCnt * 2)));
}
