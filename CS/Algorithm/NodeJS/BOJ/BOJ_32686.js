function solution(input) {
  const [N, S, E] = input[0].split(' ').map(Number);

  // 0 ~ time까지 데미지 반환
  const getDamage = (time, R, A, D) => {
    let damage = Math.floor(time / (R + A)) * D;
    if (time % (R + A) > R) damage += (D / A) * ((time % (R + A)) - R);
    return damage;
  };

  let answer = 0;
  for (let i = 1; i <= N; i++) {
    const [R, A, D] = input[i].split(' ').map(Number);
    // 0~E까지 데미지에서 0~S까지 데이지를 빼면 S~E까지 데미지
    answer += getDamage(E, R, A, D) - getDamage(S, R, A, D);
  }

  console.log(answer / (E - S));
}
const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim().split('\n');

solution(input);
