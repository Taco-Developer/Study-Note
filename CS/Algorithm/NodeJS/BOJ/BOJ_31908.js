function solution(input) {
  const N = +input[0];

  // 특징 => 해당하는 사람 배열
  const featureMap = {};

  for (let i = 1; i <= N; i++) {
    const [name, feature] = input[i].split(' ');
    if (feature === '-') continue;

    // 해당하는 특징을 key로 하는 배열에 이름 추가
    if (featureMap[feature]) featureMap[feature].push(name);
    else featureMap[feature] = [name];
  }

  const answer = [0];
  for (const feature in featureMap) {
    if (featureMap[feature].length !== 2) continue;

    // 같은 특징을 가진 반지를 가지고 있는 사람이 2명인 경우
    answer[0]++;
    answer.push(featureMap[feature].join(' '));
  }

  console.log(answer.join('\n'));
}

const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
