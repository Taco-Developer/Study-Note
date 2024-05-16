function solution(fees, records) {
  // key: 자동차 번호, value: 주차 시간(분)
  const carFeeMap = {};
  // key: 자동차 번호, value: 입차 시각(분)
  const inCarMap = {};
  // 남아있는 차량 번호
  const leftCars = new Set();

  records.forEach((log) => {
    const [time, num, status] = log.split(' ');
    const [hour, minute] = time.split(':').map(Number);
    // 입차/출차 시각(분)
    const nowMin = hour * 60 + minute;

    // 입차
    if (status === 'IN') {
      leftCars.add(num);
      inCarMap[num] = nowMin;
      return;
    }

    // 출차
    carFeeMap[num] = (carFeeMap[num] ?? 0) + nowMin - inCarMap[num];
    leftCars.delete(num);
  });

  // 아직 남은 차량 출차 시각 => 23:59
  leftCars.forEach((num) => {
    const outMin = 23 * 60 + 59;
    carFeeMap[num] = (carFeeMap[num] ?? 0) + outMin - inCarMap[num];
  });

  const answer = [];
  Object.keys(carFeeMap)
    .sort((a, b) => +a - +b)
    .forEach((num) => {
      if (carFeeMap[num] <= fees[0]) {
        answer.push(fees[1]);
        return;
      }

      answer.push(
        fees[1] + Math.ceil((carFeeMap[num] - fees[0]) / fees[2]) * fees[3]
      );
    });

  return answer;
}
