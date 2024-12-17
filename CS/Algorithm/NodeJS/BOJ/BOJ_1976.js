// 빙하 정보를 미리 저장
function solution(input) {
  const N = +input[0];
  const M = +input[1];

  // cities[i]: i번 도시가 최종적으로 연결된 도시 번호
  const cities = Array.from({ length: N + 1 }, (_, i) => i);

  // 여행 계획 도시 순서
  const plans = input.pop().split(' ').map(Number);

  // 최종적으로 연결된 도시 반환
  const getRoot = (city) => {
    if (cities[city] === city) return city;
    cities[city] = getRoot(cities[city]);
    return cities[city];
  };

  // 두 도시를 연결
  const union = (rootCityA, rootCityB) => {
    if (rootCityA <= rootCityB) cities[rootCityB] = rootCityA;
    else cities[rootCityA] = rootCityB;
  };

  input.slice(2).forEach((connect, cityA) => {
    connect.split(' ').forEach((isConnect, cityB) => {
      // 연결되지 않음
      if (isConnect === '0') return;

      const rootCityA = getRoot(cityA + 1);
      const rootCityB = getRoot(cityB + 1);
      // 이미 연결됨
      if (rootCityA === rootCityB) return;

      // 연결
      union(rootCityA, rootCityB);
    });
  });

  let answer = 'YES';
  // 여행 계획에서 연속된 두 도시가 연결되어있는지 확인
  for (let i = 1; i < M; i++) {
    const prevRoot = getRoot(cities[plans[i - 1]]);
    const nowRoot = getRoot(cities[plans[i]]);

    if (prevRoot === nowRoot) continue;

    // 연결되지 않음
    answer = 'NO';
    break;
  }

  console.log(answer);
}

const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
