function solution(input) {
  const N = +input[0];
  const power = input.slice(1).map((row) => row.trim().split(' ').map(Number));
  let answer = Infinity;

  // 스타트팀과 링크팀 능력 차이 구하기
  const getDiff = (startTeam, linkTeam) => {
    let totalStart = 0;
    let totalLink = 0;

    for (let i = 0; i < startTeam.length; i++) {
      for (let j = i + 1; j < startTeam.length; j++) {
        totalStart +=
          power[startTeam[i]][startTeam[j]] + power[startTeam[j]][startTeam[i]];
        totalLink +=
          power[linkTeam[i]][linkTeam[j]] + power[linkTeam[j]][linkTeam[i]];
      }
    }

    return Math.abs(totalStart - totalLink);
  };

  // 사람을 각 팀에 넣으며 팀의 능력 차이 구하기
  const selectTeam = (now, max, startTeam, linkTeam) => {
    // 최솟값을 찾은 경우 종료
    if (answer === 0) {
      console.log(answer);
      process.exit();
    }

    // 팀을 모두 고른 경우 차이 최솟값 저장
    if (now === max) {
      answer = Math.min(getDiff(startTeam, linkTeam), answer);
      return;
    }

    // 스타트팀에 넣기
    if (startTeam.length < max / 2) {
      startTeam.push(now);
      selectTeam(now + 1, max, startTeam, linkTeam);
      startTeam.pop();
    }

    // 링크팀에 넣기
    if (linkTeam.length < max / 2) {
      linkTeam.push(now);
      selectTeam(now + 1, max, startTeam, linkTeam);
      linkTeam.pop();
    }
  };

  selectTeam(0, N, [], []);
  console.log(answer);
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');
solution(input);
