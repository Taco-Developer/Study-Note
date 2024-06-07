function solution(input) {
  const drawStar = (len) => {
    // 길이가 3인 경우
    if (len === 3) return ['***', '* *', '***'];

    const nextLen = len / 3;
    // 현재 길이에서 3으로 나눈 길이에 해당하는 별 모양
    const prevStar = drawStar(nextLen);

    // 이전 별 모양으로 현재 별 모양 만들기
    // 위 => 이전 별 모양 * 3
    // 가운데 => 이전 별 모양 + 공백 + 이전 별 모양
    // 아래 => 이전 별 모양 * 3
    const currentStar = Array(len).fill('');

    // 위
    for (let i = 0; i < nextLen; i++) {
      currentStar[i] = prevStar[i].repeat(3);
    }

    // 가운데
    for (let i = 0; i < nextLen; i++) {
      currentStar[nextLen + i] =
        prevStar[i] + ' '.repeat(nextLen) + prevStar[i];
    }

    // 아래
    for (let i = 0; i < nextLen; i++) {
      currentStar[nextLen * 2 + i] = prevStar[i].repeat(3);
    }

    return currentStar;
  };

  return drawStar(input).join('\n');
}

const input = +require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim();
console.log(solution(input));
