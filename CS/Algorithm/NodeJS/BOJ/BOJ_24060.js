function solution(input) {
  // N: 배열의 크기, K: 찾으려는 저장 횟수
  const [N, K] = input[0].split(' ').map(Number);
  const arr = input[1].trim().split(' ').map(Number);
  // 정렬된 값을 임시로 저장하는 배열
  const sorted = Array(N).fill(0);
  // 저장된 횟수
  let cnt = 0;
  // 정답
  let answer = -1;

  const merge = (arr, left, mid, right) => {
    let leftIdx = left;
    let rightIdx = mid + 1;
    // 정렬된 값을 임시로 저장한 배열의 인덱스
    let sortedIdx = left;

    // 왼쪽과 오른쪽을 오름차순으로 임시 배열에 저장
    while (leftIdx <= mid && rightIdx <= right) {
      if (arr[leftIdx] <= arr[rightIdx]) sorted[sortedIdx++] = arr[leftIdx++];
      else sorted[sortedIdx++] = arr[rightIdx++];
    }

    // 남은 부분 임시 배열에 저장
    while (leftIdx <= mid) sorted[sortedIdx++] = arr[leftIdx++];
    while (rightIdx <= right) sorted[sortedIdx++] = arr[rightIdx++];

    // 임시 배열의 값을 원본 배열에 저장
    for (let i = left; i <= right; i++) {
      arr[i] = sorted[i];
      // 저장 횟수 카운트 및 정답 저장
      if (++cnt === K) answer = arr[i];
    }
  };

  const mergeSort = (arr, left, right) => {
    if (left < right) {
      // 왼쪽과 오른쪽으로 분할
      const mid = Math.floor((left + right) / 2);
      // 왼쪽 배열 정렬
      mergeSort(arr, left, mid);
      // 오른쪽 배열 정렬
      mergeSort(arr, mid + 1, right);
      // 왼쪽 배열과 오른쪽 배열을 병합하며 정렬
      merge(arr, left, mid, right);
    }
  };

  mergeSort(arr, 0, N - 1);

  return answer;
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');
console.log(solution(input));
