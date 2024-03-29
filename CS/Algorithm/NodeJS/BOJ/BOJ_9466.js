// 텀 프로젝트

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

solve();

function solve() {
  // T: 테스트 케이스 수
  const T = Number(input[0]);
  const answer = [];
  for (let pointer = 1; pointer <= T * 2; pointer += 2) {
    // n: 학생 수
    const n = Number(input[pointer]);
    // students[i] => i번 학생이 선택한 학생 번호
    const students = input[pointer + 1]
      .trim()
      .split(' ')
      .map((num) => Number(num) - 1);

    // 팀을 만들 수 있는지 여부
    // visited[i] => 0: 확인 X, 1: 확인 O, 2: 팀 만들 수 없음, 3: 팀 만들 수 있음
    const visited = Array(n).fill(0);

    for (let i = 0; i < n; i++) {
      if (visited[i] !== 0) continue;
      dfs(i, students, visited);
    }

    const cnt = visited.reduce((acc, cur) => (cur === 2 ? acc + 1 : acc), 0);
    answer.push(cnt);
  }

  console.log(answer.join('\n'));

  function dfs(now, students, visited) {
    // 확인 중으로 변경
    visited[now] = 1;
    const selected = [now];
    let next = students[now];

    // 이전에 확인하지 않은 학생 확인
    while (visited[next] === 0) {
      visited[next] = 1;
      selected.push(next);
      next = students[next];
    }

    // 중복 확인된 학생이 팀을 만들 수 없거나 이미 만든 경우
    if (visited[next] === 2 || visited[next] === 3) {
      // 확인한 모든 학생은 팀을 만들 수 없음
      selected.forEach((student) => {
        visited[student] = 2;
      });
      return;
    }

    // 중복 확인된 학생의 상태가 팀을 만들 수 있는지 없는지 확정되지 않은 상태인 경우
    // 중복 확인 학생부터 마지막에 저장된 학생까진 팀을 만들 수 있음
    while (true) {
      const student = selected.pop();
      visited[student] = 3;
      if (student === next) break;
    }

    // 중복 확인 이전의 학생은 팀을 만들 수 없음
    while (selected.length) {
      const student = selected.pop();
      visited[student] = 2;
    }
  }
}
