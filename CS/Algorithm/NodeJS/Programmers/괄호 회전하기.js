function solution(s) {
  const stringMap = {
    ')': '(',
    ']': '[',
    '}': '{',
  };

  const checkString = (str) => {
    const stack = [];
    for (let i = 0; i < str.length; i++) {
      if ('({['.includes(str[i])) {
        stack.push(str[i]);
        continue;
      }

      const lastChar = stack.pop();
      if (lastChar === stringMap[str[i]]) continue;

      return false;
    }

    return stack.length === 0 ? true : false;
  };

  let answer = 0;

  for (let i = 0; i < s.length; i++) {
    if (checkString(s.slice(i) + s.slice(0, i))) answer++;
  }

  return answer;
}
