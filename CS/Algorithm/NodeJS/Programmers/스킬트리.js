function solution1(skill, skill_trees) {
  // key: 스킬명, value: 선행 스킬
  const prevSkillMap = {};
  for (let i = 1; i < skill.length; i++) {
    prevSkillMap[skill[i]] = skill[i - 1];
  }

  let answer = 0;

  skill_trees.forEach((skillTree) => {
    // 지금까지 배운 스킬
    const learnedSkill = new Set();

    for (let i = 0; i < skillTree.length; i++) {
      const nowSkill = skillTree[i];
      // 선행 스킬이 있는데 아직 배우지 않은 경우 함수 종료
      if (prevSkillMap[nowSkill] && !learnedSkill.has(prevSkillMap[nowSkill]))
        return;
      learnedSkill.add(nowSkill);
    }

    // 종료되지 않았다면 가능한 스킬트리
    answer++;
  });

  return answer;
}

function solution2(skill, skill_trees) {
  const isPossible = (skillTree) => {
    // 확인할 선행스킬 인덱스
    let prevIdx = 0;

    for (let i = 0; i < skillTree.length; i++) {
      // 선행 스킬이 없는 경우 넘어가기
      if (!skill.includes(skillTree[i])) continue;
      // 선행 스킬이 있는데 모두 배운 경우 넘어가기
      if (skill[prevIdx] === skillTree[i]) {
        prevIdx++;
        continue;
      }

      return false;
    }

    return true;
  };

  return skill_trees.filter((skillTree) => isPossible(skillTree)).length;
}
