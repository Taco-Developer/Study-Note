// width * 2 + height * 2  - 4 = brown
// width + height = brown / 2 + 2;

// width * height = brow + yellow
// width >= height이므로 width >= (width + height) / 2
function solution(brown, yellow) {
  const halfRound = brown / 2 + 2;

  for (let width = Math.ceil(halfRound / 2); width <= halfRound - 3; width++) {
    const height = halfRound - width;
    if (width * height === brown + yellow) {
      return [width, height];
    }
  }
}
