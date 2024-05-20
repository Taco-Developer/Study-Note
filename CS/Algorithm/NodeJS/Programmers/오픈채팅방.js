function solution(record) {
  // uid에 해당하는 nickname 저장
  // key: uid, value: nickname
  const uidMap = {};

  // 방문, 퇴장 로그 저장
  const logs = [];

  record.forEach((log) => {
    const [status, uid, nickname] = log.split(' ');

    if (status !== 'Change') logs.push([status, uid]);
    if (status !== 'Leave') uidMap[uid] = nickname;
  });

  return logs.map(([status, uid]) => {
    const nickname = uidMap[uid];
    const statement = status === 'Enter' ? '들어왔습니다.' : '나갔습니다.';
    return `${nickname}님이 ${statement}`;
  });
}
