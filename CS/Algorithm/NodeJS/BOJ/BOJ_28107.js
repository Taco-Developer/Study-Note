function solution(input) {
  const [N, _] = input[0].split(' ').map(Number);

  // orderList[i] => i번 초밥을 주문한 손님 배열(손님 번호 내림차순)
  const orderList = [];
  for (let i = N; i > 0; i--) {
    const [_, ...list] = input[i].trim().split(' ').map(Number);
    list.forEach((susi) => {
      if (orderList[susi]) orderList[susi].push(i);
      else orderList[susi] = [i];
    });
  }

  const answer = Array(N + 1).fill(0);
  input[N + 1].split(' ').forEach((susi) => {
    // 현재 초밥을 주문한 손님 중 번호가 가장 빠른 손님(없으면 undefined)
    const customer = orderList[+susi]?.pop();
    if (customer) answer[customer]++;
  });

  console.log(answer.slice(1).join(' '));
}
const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
