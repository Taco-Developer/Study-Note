// 거짓말

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

// N: 사람 수, M: 파티 수
const [N, M] = input[0].split(' ').map(Number);
// knowCnt: 진실 아는 사람 수, knowPeople: 진실 아느 사람 배열
const [knowCnt, ...knowPeople] = input[1].trim().split(' ').map(Number);

// 파티별 진실 아는 사람 정보
// (0: 진실도 거짓도 모르는 상태, -1: 거짓을 아는 상태, 1: 진실을 아는 상태)
const peopleData = Array.from({ length: M + 1 }, () => Array(N + 1).fill(0));
if (knowCnt > 0) knowPeople.forEach((person) => (peopleData[0][person] = 1));

let ans = 0;

startParty(0, 0);

console.log(ans);

// 과장할 수 있는 파티 횟수 구하는 함수
function startParty(partyNum, cnt) {
  // 현재 남은 파티 수 + 과장한 수 <= 이전 최댓값 보다 작다면 종료
  if (M - partyNum + cnt <= ans) return;

  // 모든 파티를 다 돌았다면 최댓값이므로 저장
  if (partyNum === M) {
    ans = cnt;
    return;
  }

  // people: 파티 참가 사람 배열
  const [_, ...people] = input[partyNum + 2].trim().split(' ').map(Number);

  // 진실을 아는 사람 수
  let knowCnt = 0;
  // 과장을 아는 사람 수
  let lieKnowCnt = 0;

  // 파티 참석 인원 중 진실을 아는 사람과 과장을 아는 사람 카운트
  for (const person of people) {
    if (peopleData[partyNum][person] === 1) {
      knowCnt++;
    } else if (peopleData[partyNum][person] === -1) {
      lieKnowCnt++;
    }
  }

  // 진실을 아는 사람과 과장을 아는 사람 모두 있다면 아무 말도 못함
  if (knowCnt > 0 && lieKnowCnt > 0) return;

  // 진실을 아는 사람이 없는 경우 - 과장을 알림
  if (knowCnt === 0) {
    checkPeople(partyNum + 1, people, false);
    startParty(partyNum + 1, cnt + 1);
    // 이번 파티 정보 제거
    peopleData[partyNum + 1] = Array(N + 1).fill(0);
  }

  // 과장을 아는 사람이 없는 경우 - 진실을 알림
  if (lieKnowCnt === 0) {
    checkPeople(partyNum + 1, people, true);
    startParty(partyNum + 1, cnt);
    // 이번 파티 정보 제거
    peopleData[partyNum + 1] = Array(N + 1).fill(0);
  }
}

// 사람들이 진실을 아는지 과장을 아는지 체크
function checkPeople(partyNum, people, isTruth) {
  peopleData[partyNum] = [...peopleData[partyNum - 1]];
  for (const person of people) {
    peopleData[partyNum][person] = isTruth ? 1 : -1;
  }
}
