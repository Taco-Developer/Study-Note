function solution(input) {
  // 최대 공약수 찾는 함수
  const getGcd = (num1, num2) => {
    if (num2 === 0) return num1;
    return getGcd(num2, num1 % num2);
  };

  const answer = [];

  let inputIdx = 0;
  let testCase = 0;
  while (true) {
    const n = +input[inputIdx++];
    if (n === 0) break;
    testCase++;

    let result = `Test ${testCase}: `;
    let int = 0; // 정수부
    let child = 0; // 분자
    let parent = 0; // 분모

    for (let i = 0; i < n; i++) {
      // data1: 정수부,분자
      // data2: 분모
      const [data1, data2] = input[inputIdx++].split('/');

      let nowInt = 0; // 현재 정수부
      let nowChild = 0; // 현재 분자
      let nowParent = 0; // 현재 분모

      // 입력값에 분모가 있는 경우
      if (data2) {
        nowParent += +data2;

        const [data3, data4] = data1.split(',');
        // 입력값에 정수부가 있는 경우
        if (data4) {
          nowInt += +data3;
          nowChild += +data4;
        }
        // 입력값에 정수부가 없는 경우
        else nowChild += +data3;
      }
      // 입력값에 분모가 없는 경우 => 정수부만 있는 경우
      else nowInt += +data1;

      // 정수부 더하기
      if (nowChild !== 0 && nowChild >= nowParent) {
        nowInt += Math.floor(nowChild / nowParent);
        nowChild %= nowParent;
      }
      int += nowInt;

      // 누적된 값에 분자가 0인 경우
      if (child === 0) {
        child = nowChild;
        parent = nowParent;
        continue;
      }

      // 소수부 더하기
      child = child * nowParent + nowChild * parent;
      parent *= nowParent;

      // 정수부, 소수부 구분
      if (child >= parent) {
        int += Math.floor(child / parent);
        child %= parent;
      }

      // 소수부 기약분수 만들기
      const gcd = getGcd(parent, child);
      child /= gcd;
      parent /= gcd;
    }

    if (int === 0 && child === 0) result += 0;
    else if (int === 0) result += `${child}/${parent}`;
    else if (child === 0) result += int;
    else result += `${int},${child}/${parent}`;

    answer.push(result);
  }

  console.log(answer.join('\n'));
}

const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
