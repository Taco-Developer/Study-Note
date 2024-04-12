function solution(s) {
  const answer = [0, 0];

  while (s !== '1') {
    s = chageString(remove(s));
    answer[0]++;
  }

  return answer;

  function remove(string) {
    let cnt = 0;

    for (let i = 0; i < string.length; i++) {
      if (string[i] === '0') cnt++;
    }

    answer[1] += cnt;
    return string.length - cnt;
  }

  function chageString(num) {
    let res = '';
    while (num > 0) {
      res = (num % 2) + res;
      num = Math.floor(num / 2);
    }

    return res;
  }
}

console.log(solution('110010101001'));
