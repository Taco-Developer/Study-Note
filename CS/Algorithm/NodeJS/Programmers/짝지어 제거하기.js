function solution(s) {
  let answer = 0;
  const stack = [s[0]];

  for (let i = 1; i < s.length; i++) {
    if (stack[stack.length - 1] === s[i]) {
      stack.pop();
      continue;
    }

    stack.push(s[i]);
  }

  if (stack.length === 0) answer = 1;

  return answer;
}
