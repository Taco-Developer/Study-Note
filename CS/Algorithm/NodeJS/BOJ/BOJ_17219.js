// 입력
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

// N: 저장된 사이트 주소 수, M: 찾으려는 사이트 주소 수
const [N, M] = input[0]
  .trim()
  .split(' ')
  .map((num) => +num);

// 사이트를 키로 비밀번호를 값으로 가지는 딕셔너리
const siteDict = {};
for (let i = 1; i < N + 1; i++) {
  const [site, pw] = input[i].trim().split(' ');
  siteDict[site] = pw;
}

// 정답을 저장하는 배열
const ans = [];
for (let i = N + 1; i < N + M + 1; i++) {
  ans.push(siteDict[input[i].trim()]);
}

// 출력
console.log(ans.join('\n'));
