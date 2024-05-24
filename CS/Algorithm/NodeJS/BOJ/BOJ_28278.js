// 스택 2

function solution(input) {
  const execute = (data, stack, answer) => {
    const [cmd, X] = data.split(' ').map(Number);

    switch (cmd) {
      case 1:
        stack.push(X);
        break;

      case 2:
        answer.push(stack.length ? stack.pop() : -1);
        break;

      case 3:
        answer.push(stack.length);
        break;

      case 4:
        answer.push(stack.length === 0 ? 1 : 0);
        break;

      case 5:
        answer.push(stack.length ? stack[stack.length - 1] : -1);
        break;

      default:
        break;
    }
  };

  const answer = [];
  const stack = [];

  input.forEach((data) => {
    execute(data, stack, answer);
  });

  return answer.join('\n');
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .split('\n')
  .slice(1);
console.log(solution(input));
