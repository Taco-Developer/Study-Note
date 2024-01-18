/**
 *
 * @param {*} cnt 선택된 수의 개수
 * @param {*} visited 방문 정보
 * @param {*} selctedNums 선택된 숫자 배열
 * @param {*} N 전체 숫자 개수
 * @param {*} M 선택할 숫자 개수
 * @param {*} nums 전체 숫자
 * @param {*} permutation 현재까지 저장된 수열
 */
function dfs(cnt, visited, selctedNums, N, M, nums, permutation) {
  // 선택 완료
  if (cnt === M) {
    permutation.add(selctedNums.join(' '));
    return;
  }

  // 전체 숫자 모음에서 숫자 1개 선택
  for (let i = 0; i < N; i++) {
    // 이미 선택한 숫자(위치) 선택 X
    if (visited[i]) continue;

    // 방문 처리 및 선택
    visited[i] = 1;
    selctedNums.push(nums[i]);
    // 다음 위치 선택
    dfs(cnt + 1, visited, selctedNums, N, M, nums, permutation);
    // 방문 처리 및 선택 취소
    visited[i] = 0;
    selctedNums.pop();
  }
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

// N: 전체 수의 개수, M: 선택할 수의 개수
const [N, M] = input[0]
  .trim()
  .split(' ')
  .map((num) => +num);

// 전체 숫자 배열, 낮은 순으로 정렬
const nums = input[1]
  .trim()
  .split(' ')
  .map((num) => +num);
nums.sort((a, b) => a - b);

// 수열 Set으로 저장 (중복 제거)
const permutation = new Set();
// 방문 정보 (해당 숫자 사용 여부)
const visited = Array(N).fill(0);

// 수열 찾기
dfs(0, visited, [], N, M, nums, permutation);

// 출력
console.log(Array.from(permutation).join('\n'));
