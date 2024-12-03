function solution(input) {
  const [N, M] = input[0].split(' ').map(Number);

  const workData = input
    .slice(1)
    .map((places) => places.trim().split(' ').map(Number));

  let answer = 0;

  const carryOut = (date, prevPlace, score) => {
    // 임무 수행 완료
    if (date === N) {
      if (score >= M) answer++;
      return;
    }

    // work: 하는 일(0: 정보 수집, 1: 감시)
    for (let work = 0; work < 2; work++) {
      // place: 일하는 장소(0: 수족관, 1: 시청, 2: 학교)
      for (let place = 0; place < 3; place++) {
        // 현재 임무 수행
        carryOut(
          date + 1,
          place,
          (prevPlace === place
            ? workData[work][place] / 2
            : workData[work][place]) + score
        );
      }
    }
  };

  // 임무 시작
  carryOut(0, -1, 0);

  console.log(answer);
}
const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
