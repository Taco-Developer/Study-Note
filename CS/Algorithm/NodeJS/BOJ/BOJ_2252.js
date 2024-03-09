// 줄 세우기

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

solve(input);

function solve(input) {
  const [N, M] = input[0].split(' ').map(Number);
  // 인덱스를 학생으로 배열 초기화
  // front: 앞에 존재하는 학생 Set
  // back: 뒤에 존재하는 학생 Set
  const students = Array.from({ length: N + 1 }, () => ({
    front: new Set(),
    back: new Set(),
  }));

  // 앞, 뒤 정보를 받아 앞에 있는 학생에겐 뒤에 있는 학생 정보를 추가하고
  // 뒤에 있는 학생에겐 앞에 있는 학생 정보 추가
  input.slice(1, M + 1).forEach((row) => {
    const [front, back] = row.split(' ').map(Number);
    students[front].back.add(back);
    students[back].front.add(front);
  });

  // 줄을 섰는지 여부
  const visited = Array(N + 1).fill(false);
  // 무조건 앞에 서야하는 학생이 없는 학생 배열 => 줄을 설 수 있는 학생
  const possibleStudents = [];
  for (let i = 1; i <= N; i++) {
    if (students[i].front.size === 0) possibleStudents.push(i);
  }

  const ans = [];

  // 모든 학생이 줄을 선다면 종료
  while (ans.length !== N) {
    const studentIdx = possibleStudents.pop();
    // 이미 줄을 선 학생 패스
    if (visited[studentIdx]) continue;
    // 줄서기
    visited[studentIdx] = true;
    ans.push(studentIdx);

    // 현재 학생의 뒤에 서야하는 학생들의 앞에 있어야하는 학생 목록에서 현재 학생 지우기
    students[studentIdx].back.forEach((nextStudentIdx) => {
      students[nextStudentIdx].front.delete(studentIdx);

      // 앞에 있어야 하는 학생이 없어진 경우 possible에 추가
      if (students[nextStudentIdx].front.size === 0)
        possibleStudents.push(nextStudentIdx);
    });
  }

  console.log(ans.join(' '));
}
