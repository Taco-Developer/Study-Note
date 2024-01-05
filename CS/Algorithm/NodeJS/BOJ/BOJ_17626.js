// 입력
const n = +require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString();

// 인덱스를 만들 수 있는 제곱수의 개수를 저장 (최대 4이므로 4로 초기화)
const ans = Array(n + 1).fill(4);
// 제곱수 모음
const squares = [];

for (let i = 1; i <= n; i++) {
  // n 보다 크면 고려 사항 X
  if (i * i <= n) {
    // 하나로 표현 가능
    ans[i * i] = 1;
    // 제곱수 저장
    squares.push(i * i);
  }

  // 제곱수를 꺼내서 비교
  for (let j = 0; j < squares.length; j++) {
    const nowSquare = squares[j];

    // 현재 꺼낸 제곱수가 현재 확인하려는 수 보다 크거나 같으면 비교 종료
    if (nowSquare >= i) break;

    // ans[i] : i를 표현할 수 있는 현재 저장된 제곱수 개수
    // ans[i - 제곱수] + 1 : (i - 제곱수)를 표현할 수 있는 저장된 제곱수 개수 + 1
    // 제곱수는 1개의 수 제곱으로 표현 가능하므로 + 1을 함
    // 가능한 조합 중 가장 작은 값을 저장
    if (ans[i] > ans[i - nowSquare] + 1) {
      ans[i] = ans[i - nowSquare] + 1;
    }
  }
}

// 출력
console.log(ans[n]);
