function solution(numbers) {
  const answer = Array(numbers.length).fill(-1);
  const stack = [];

  numbers.forEach((num, i) => {
    while (stack.length && numbers[stack[stack.length - 1]] < num) {
      answer[stack.pop()] = num;
    }

    stack.push(i);
  });

  stack.forEach((idx) => {
    answer[idx] = -1;
  });

  return answer;
}
