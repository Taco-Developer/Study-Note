const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

solve2(input);

// 시간 초과
function solve(input) {
  let string = input[0].trim();
  const explosion = input[1].trim();

  while (true) {
    // 폭파되는 위치 저장하는 배열
    const slicePosition = [];
    // 현재 확인하는 문자 위치
    let idx = 0;
    while (idx < string.length) {
      // 폭파 문자 시작과 일치하면 폭파 문자와 비교 후 위치 저장
      if (
        string[idx] === explosion[0] &&
        string.slice(idx, idx + explosion.length) === explosion
      ) {
        slicePosition.push(idx);
        idx += explosion.length;
        continue;
      }

      idx++;
    }

    if (!slicePosition.length) break;

    // 문자열 폭파 후 업데이트
    let temp = '';
    let start = 0;
    slicePosition.forEach((position) => {
      temp += string.slice(start, position);
      start = position + explosion.length;
    });
    temp += string.slice(start, string.length);
    string = temp;
  }

  console.log(string === '' ? 'FRULA' : string);
}

// stack 활용
// 스택에 문자열 문자를 하나씩 push하다가 stack에 폭발 문자열이 만들어진다면 폭발 문자열 pop
function solve2(input) {
  // string: 문자열, explosion: 폭발 문자
  const [string, explosion] = [input[0].trim(), input[1].trim()];
  // 폭발 문자 길이
  const explosionLength = explosion.length;

  const ans = [];

  for (let i = 0; i < string.length; i++) {
    // 현재 문자 스택에 push
    ans.push(string[i]);

    // 스택에 쌓인 문자의 숫자가 폭발 문자보다 작다면 패스(폭발 문자열이 만들어질 수 없음)
    if (ans.length < explosionLength) continue;
    // 현재 문자가 폭발 문자열의 끝 문자와 다르면 패스(폭발 문자열이 아님)
    if (string[i] !== explosion[explosionLength - 1]) continue;

    // 스택 끝에서 폭발 문자열 길이로 문자열 만들기
    const lastString = ans
      .slice(ans.length - explosionLength, ans.length + 1)
      .join('');

    // 만약 꺼낸 문자열이 폭발 문자열과 같다면 전부 pop = 폭파
    if (lastString === explosion) {
      for (let j = 0; j < explosionLength; j++) {
        ans.pop();
      }
    }
  }

  // 스택에 남은 문자열이 없다면 FRULA, 있다면 문자열로 변환 후 출력
  console.log(ans.length === 0 ? 'FRULA' : ans.join(''));
}
