function solution(input) {
  let [n, m, t] = input.split(' ').map(Number);
  [n, m] = [Math.min(n, m), Math.max(n, m)]; // n < m이 되도록 업데이트

  let nCnt = Math.floor(t / n); // n분 걸리는 버거 개수(최댓값으로 초기화)
  const answer = [nCnt, t % n]; // answer[0]: 먹은 버거 개수, answer[1]: 콜라를 마신 시간

  // 콜라를 마시지 않는 경우가 있으면 종료
  // n분 걸리는 버거 개수를 최댓값에서 0으로 줄여가면서 확인
  while (answer[1] !== 0 && nCnt > 0) {
    nCnt--;

    const leftTime = t - nCnt * n; // n분 걸리를 버거를 먹고 남은 시간
    const colaTime = leftTime % m; // 콜라를 마시는 시간

    // 콜라 마시는 시간이 줄어든다면 업데이트
    if (answer[1] > colaTime) {
      answer[1] = colaTime;
      answer[0] = nCnt + Math.floor(leftTime / m);
    }
  }

  console.log(answer.join(' '));
}

const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim();

solution(input);
