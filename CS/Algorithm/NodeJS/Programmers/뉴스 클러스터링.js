function solution(str1, str2) {
  // 모두 대문자로 변환
  str1 = str1.toUpperCase();
  str2 = str2.toUpperCase();

  // 2개로 끊어서 각 원소 개수 저장
  const getElements = (str, elementMap, idx) => {
    for (let i = 0; i < str.length - 1; i++) {
      if (str[i] < 'A' || str[i] > 'Z') continue;
      if (str[i + 1] < 'A' || str[i + 1] > 'Z') continue;

      const element = str[i] + str[i + 1];
      if (!elementMap[element]) elementMap[element] = [0, 0];
      elementMap[element][idx]++;
    }
  };

  const elementMap = {};
  getElements(str1, elementMap, 0);
  getElements(str2, elementMap, 1);

  // 교집합 크기, 합집합 크기 구하기
  let intersectionSize = 0;
  let unionSize = 0;
  for (const element in elementMap) {
    const min = Math.min(...elementMap[element]);
    const max = Math.max(...elementMap[element]);

    intersectionSize += min;
    unionSize += max;
  }

  const answer = unionSize === 0 ? 1 : intersectionSize / unionSize;
  return Math.floor(answer * 65536);
}
