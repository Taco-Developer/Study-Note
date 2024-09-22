function solution(input) {
  const [N, M, Q] = input[0].split(' ').map(Number);

  // objectCnts[i] => i번 객체를 가리키는 포인터 개수
  const objectCnts = Array(N + 1).fill(0);

  // pointers[i] => 각 포인터가 가리키는 객체 번호
  const pointers = [0];
  for (let i = 1; i <= M; i++) {
    pointers.push(+input[i]);
    objectCnts[pointers[i]]++;
  }

  // 명령 실행 함수
  const execute = (cmd, x, y) => {
    switch (cmd) {
      case 'assign':
        // x가 가리키던 객체 지우기
        objectCnts[pointers[x]]--;

        // x는 y가 가리키던 객체를 가리킴
        pointers[x] = pointers[y];

        // 가리키는 포인터 개수 + 1
        objectCnts[pointers[x]]++;
        break;

      case 'swap':
        [pointers[x], pointers[y]] = [pointers[y], pointers[x]];
        break;

      case 'reset':
        objectCnts[pointers[x]]--;
        pointers[x] = 0;
        objectCnts[0]++;
    }
  };

  for (let i = M + 1; i < M + Q + 1; i++) {
    const [cmd, x, y] = input[i].split(' ');
    execute(cmd, +x, +y);
  }

  const answer = [0];
  for (let i = 1; i <= N; i++) {
    if (objectCnts[i] === 0) continue;
    answer[0]++;
    answer.push(i);
  }

  console.log(answer.join('\n'));
}

const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
