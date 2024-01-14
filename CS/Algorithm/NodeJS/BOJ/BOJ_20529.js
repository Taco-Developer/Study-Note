/**
 * 세 학생 간 거리 합의 최솟값을 구하는 함수
 * @param {number} now 현재 학생 인덱스
 * @param {number} N 전체 학생 수
 * @param {string[]} selected 선택된 학생 배열
 * @param {number} t 현재 테스트 케이스 번호
 * @param {number[]} ans 정답이 저장된 배열
 * @param {string[]} students 전체 학생 배열
 * @returns
 */
function dfs(now, N, selected, t, ans, students) {
  // 최솟값이 나온 경우 종료
  if (ans[t] === 1) return;

  // 3명 모두 선택되면 거리 비교 후 최솟값 저장
  if (selected.length === 3) {
    const distance = compareDistance(selected);
    // 현재 테스트 케이스 정답 업데이트
    ans[t] = ans[t] < distance ? ans[t] : distance;
    return;
  }

  // 끝까지 세 명이 선택되지 않은 경우
  if (now === N) {
    return;
  }

  // 현재 학생 선택 X
  dfs(now + 1, N, selected, t, ans, students);

  // 현재 학생 선택 O
  selected.push(students[now]);
  dfs(now + 1, N, selected, t, ans, students);
  // 선택 취소
  selected.pop();
}

/**
 * 세 학생 간 거리 합을 구하는 함수
 * @param {*} selected 선택된 학생 배열
 * @returns
 */
function compareDistance(selected) {
  let distance = 0;

  for (let index = 0; index < 4; index++) {
    if (selected[0][index] !== selected[1][index]) distance++;
    if (selected[1][index] !== selected[2][index]) distance++;
    if (selected[2][index] !== selected[0][index]) distance++;
  }

  return distance;
}

// 입력
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

// T: 테스트 케이스
const T = +input[0];

// 각 테스트 케이스별 정답을 저장
const ans = Array(T).fill(12);

for (let i = 0; i < T; i++) {
  const N = +input[i * 2 + 1];

  // N이 32보다 크다면 세 번 나온 MBTI가 하나는 무조건 있으므로 최솟값은 0
  if (N > 32) {
    ans[i] = 0;
    continue;
  }

  // 전체 학생 MBTI 배열
  const students = input[i * 2 + 2].trim().split(' ');

  // 최솟값 저장
  dfs(0, N, [], i, ans, students);
}

console.log(ans.join('\n'));
