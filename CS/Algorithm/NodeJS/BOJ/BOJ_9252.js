// LCS 2

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .split('\n');

solve(input);

function solve(input) {
  // first: 첫 번째 수열, second: 두 번째 수열
  const [first, second] = input.map((string) => string.trim());

  const firstLength = first.length;
  const secondLength = second.length;

  // dp[i][j] => [길이, first의 i까지 수열과 second의 j까지 수열에서 가장 긴 모두의 부분 수열이 되는 수열]
  const dp = Array.from({ length: firstLength + 1 }, () =>
    Array(secondLength + 1).fill('')
  );

  // i => first 길이
  for (let i = 1; i < firstLength + 1; i++) {
    // j => second 길이
    for (let j = 1; j < secondLength + 1; j++) {
      // 현재 위치 글자가 같은 경우
      if (first[i - 1] === second[j - 1]) {
        // i-1과 j-1에 현재 글자 추가
        dp[i][j] = dp[i - 1][j - 1] + first[i - 1];
        continue;
      }

      // 다른 경우
      // fisrt의 i-1까지 수열과 second의 j까지 수열에서 가장 긴 모두의 부분 수열인 수열
      const up = dp[i - 1][j];
      // first의 i까지 수열과 second의 j-1까지 수열에서 가장 긴 모두의 부분 수열인 수열
      const left = dp[i][j - 1];
      // 둘 중 더 긴 수열을 저장
      dp[i][j] = up.length > left.length ? up : left;
    }
  }

  console.log(
    dp[firstLength][secondLength].length + '\n' + dp[firstLength][secondLength]
  );
}
