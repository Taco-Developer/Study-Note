// 명령 프롬프트

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

solve(input);

function solve(input) {
  const N = +input[0];

  const files = input.slice(1, N + 1).map((file) => file.trim());

  let ans = '';
  for (let i = 0; i < files[0].length; i++) {
    let isSame = true;
    const char = files[0][i];

    for (let j = 1; j < N; j++) {
      if (char !== files[j][i]) {
        isSame = false;
        break;
      }
    }

    if (isSame) {
      ans += char;
    } else {
      ans += '?';
    }
  }

  console.log(ans);
}
