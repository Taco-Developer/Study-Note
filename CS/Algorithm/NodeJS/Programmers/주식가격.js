function solution(prices) {
  const answer = Array(prices.length).fill(0);
  const lastTime = prices.length - 1;
  const stack = [];

  // 0초 ~ prices.length - 1초
  for (let time = 0; time <= lastTime; time++) {
    // 도중에 가격이 떨어지는 경우 계산
    while (stack.length && prices[stack[stack.length - 1]] > prices[time]) {
      // 현재 주식 가격보다 큰 가격일 때 시간
      const prevTime = stack.pop();
      // 현재 시간과의 차이만큼 저장
      answer[prevTime] = time - prevTime;
    }
    stack.push(time);
  }

  // 끝까지 떨어지지 않은 경우 마지막 시간에서 그 당시 시간의 차이만큼 저장
  stack.forEach((time) => {
    answer[time] = lastTime - time;
  });

  return answer;
}
