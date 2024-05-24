function solution(num) {
  // 창문이 열려있다면 약수의 개수가 홀수라는 의미
  // 약수의 개수가 홀수인 경우는 제곱수
  // num의 범위에서 제곱수의 개수가 창문이 열려있는 개수
  let answer = 0;
  for (let i = 1; i * i <= num; i++) answer++;
  return answer;
}

const input = +require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString();
console.log(solution(input));
