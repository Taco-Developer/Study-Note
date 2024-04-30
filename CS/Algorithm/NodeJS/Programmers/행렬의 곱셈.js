function solution(arr1, arr2) {
  const answer = Array.from({ length: arr1.length }, () =>
    Array(arr2[0].length).fill(0)
  );

  // i => arr1의 행 => answer의 행
  for (let i = 0; i < arr1.length; i++) {
    // j => arr2의 열 => answer의 열
    for (let j = 0; j < arr2[0].length; j++) {
      // k => arr1의 열 => arr2의 행
      for (let k = 0; k < arr1[0].length; k++) {
        answer[i][j] += arr1[i][k] * arr2[k][j];
      }
    }
  }

  return answer;
}
