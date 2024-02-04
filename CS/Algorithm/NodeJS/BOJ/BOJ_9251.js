const [word1, word2] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((word) => word.trim().split(''));

// dp[y][x]는 word1 y길이까지와 word2 x길이까지 단어에서 모두의 부분 수열 중 가장 긴 공통 수열 길이 저장
const dp = Array.from({ length: word1.length + 1 }, () =>
  Array(word2.length + 1).fill(0)
);

for (let y = 1; y <= word1.length; y++) {
  for (let x = 1; x <= word2.length; x++) {
    // 알파벳이 같다면 1칸 word1 y-1 길이 단어와 word2 x-1 길이 단어에서 가장 긴 공통 수열 길이 + 1
    // 즉, 이전 길이에서 가장 긴 공통 수열에 일치하는 알파벳이 추가됨
    if (word1[y - 1] === word2[x - 1]) {
      dp[y][x] = dp[y - 1][x - 1] + 1;
      continue;
    }

    // 일치하지 않는다면 word1 y-1 길이와 word2 x 길이 단어에서 가장 긴 공통 수열 길이(dp[y-1][x])와
    // word1 y 길이와 word2 x - 1 길이 단어에서 가장 긴 공통 수열 길이(dp[y][x-1])를 비교해서 큰 값을 저장
    // 현재 알파벳이 다르므로 이전에 찾은 가장 긴 공통 수열의 길이를 가져와서 저장
    dp[y][x] = Math.max(dp[y - 1][x], dp[y][x - 1]);
  }
}

// 가장 마지막에 최댓값이 저장됨
console.log(dp[word1.length][word2.length]);
