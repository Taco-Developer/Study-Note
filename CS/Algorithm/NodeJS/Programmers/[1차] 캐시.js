function solution(cacheSize, cities) {
  const HIT = 1;
  const MISS = 5;

  if (cacheSize === 0) return cities.length * MISS;

  let answer = 0;
  const cache = [];

  cities.forEach((city) => {
    // 대문자로 변환
    city = city.toUpperCase();

    // 캐시 적중 여부 확인
    // MISS => 캐시가 가득 찼다면 맨 앞 city 지우기
    // HIT => 마지막에 추가하기 위해 현재 city cache에서 지우기
    // cache 마지막에 현재 city 추가
    const cacheIndex = cache.findIndex((cacheCity) => cacheCity === city);
    if (cacheIndex === -1) {
      answer += MISS;
      if (cache.length === cacheSize) cache.shift();
    } else {
      answer += HIT;
      cache.splice(cacheIndex, 1);
    }
    cache.push(city);
  });

  return answer;
}
