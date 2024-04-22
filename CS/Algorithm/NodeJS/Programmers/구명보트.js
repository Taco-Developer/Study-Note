function solution(people, limit) {
  people.sort((a, b) => a - b);

  let answer = 0;
  let left = -1;
  let right = people.length;

  while (left + 1 < right) {
    answer++;
    let sum = people[--right];
    if (sum + people[left + 1] <= limit) {
      left++;
    }
  }

  return answer;
}
