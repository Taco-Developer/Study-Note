function solution(input) {
  let answer = 0;
  const chatLogs = new Set();

  input.forEach((log) => {
    if (log === 'ENTER') {
      chatLogs.clear();
      return;
    }

    if (chatLogs.has(log)) return;

    answer++;
    chatLogs.add(log);
  });

  return answer;
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .slice(1);
console.log(solution(input));
