function solution(input) {
  const [N, M, K] = input[0].split(' ').map(Number);

  const answer = [0, 0];

  // 공개 과목
  const opened = new Set(input.slice(N + 1));

  // 브실이 과목 정보
  const subjects = {};
  for (let i = 1; i <= N; i++) {
    let [subject, score] = input[i].split(' ');
    score = +score;

    if (opened.has(subject)) {
      answer[0] += score;
      answer[1] += score;
      continue;
    }

    subjects[subject] = score;
  }

  // 확인할 과목 개수
  const cnt = M - K;

  // 각 과목들의 점수(오름차순)
  const scores = Object.values(subjects).sort((a, b) => a - b);
  // 점수 배열의 마지막 인덱스
  const end = N - K - 1;

  // answer[0]: 최솟값, answer[1]: 최댓값
  for (let i = 0; i < cnt; i++) {
    answer[0] += scores[i];
    answer[1] += scores[end - i];
  }

  console.log(answer.join(' '));
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');
solution(input);
