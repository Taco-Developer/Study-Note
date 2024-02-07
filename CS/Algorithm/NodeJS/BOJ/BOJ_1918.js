const inorder = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('')
  .map((char) => char.trim());

console.log(inToPost(inorder));

// 중위 표기법을 후위 표기법으로 변경하는 함수
// stack을 활용해 중위 연산 표기법을 후위 연산 표기법으로 변경 가능
// 연산자가 아닌 문자는 그대로 출력
// 괄호 안 연산자는 괄호 밖 연산자보다 우선 순위가 높음
// 여는 괄호는 stack에 push하고 닫는 괄호는 stack에 저장된 연산자를 여는 괄호가 나올 때까지 pop해서 출력
// 그 외 연산자는 stack의 top에 있는 연산자의 우선 순위가 현재 연산자보다 낮아질 때까지 pop해서 출력하고
// stack에 현재 연산자 push
// 마지막에 stack에 남아있는 연산자를 모두 pop해서 출력
function inToPost(inorder) {
  // 연산자 우선 순위
  const operators = { '(': 1, ')': 2, '+': 3, '-': 3, '*': 4, '/': 4 };

  const stack = [];

  // 후위 연산 표기법
  let res = '';

  for (let i = 0; i < inorder.length; i++) {
    const char = inorder[i];

    // 연산자가 아닌 알파벳은 res 추가
    if (!operators[char]) {
      res += char;
      continue;
    }

    // 시작 괄호인 경우 괄호 push
    if (operators[char] === 1) {
      stack.push(char);
      continue;
    }

    // 종료 괄호인 경우 stack에서 시작 괄호까지 꺼내서 res 추가 (시작 괄호는 pop만 진행)
    if (operators[char] === 2) {
      while (true) {
        const operator = stack.pop();
        if (operators[operator] === 1) break;
        res += operator;
      }
      continue;
    }

    // 괄호를 제외한 연산자는 stack에서 현재 연산자보다 우선 순위가 낮은 연산자가 나올 때까지 꺼내서 res에 추가
    while (
      stack.length > 0 &&
      operators[stack[stack.length - 1]] >= operators[char]
    ) {
      res += stack.pop();
    }

    // 현재 연산자 push
    stack.push(char);
  }

  // stack에 쌓인 연산자 res에 추가
  while (stack.length > 0) {
    res += stack.pop();
  }

  return res;
}
