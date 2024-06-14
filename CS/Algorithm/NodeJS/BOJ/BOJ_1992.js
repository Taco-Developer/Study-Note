function solution(input) {
  const N = +input[0];
  const video = input.slice(1).map((row) => row.trim().split(''));

  const compress = (y, x, len) => {
    if (len === 1) return video[y][x];

    // 현재 블록을 4개로 나누기
    const nextLen = len / 2;
    const leftTop = compress(y, x, nextLen);
    const rightTop = compress(y, x + nextLen, nextLen);
    const leftBottom = compress(y + nextLen, x, nextLen);
    const rightBottom = compress(y + nextLen, x + nextLen, nextLen);

    // 4구역 모두 하나의 색으로 이루어진 경우
    if (
      leftTop === rightTop &&
      rightTop === leftBottom &&
      leftBottom === rightBottom &&
      leftTop === video[y][x]
    )
      return leftTop;

    // 다른 색이 있는 경우
    return `(${leftTop}${rightTop}${leftBottom}${rightBottom})`;
  };

  return compress(0, 0, N);
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');
console.log(solution(input));
