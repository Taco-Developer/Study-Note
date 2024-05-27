class Dequeue {
  left = [];
  leftHeadIdx = 0;
  leftTailIdx = 0;
  right = [];
  rightHeadIdx = 0;
  rightTailIdx = 0;

  // 정수의 개수 출력
  getNumCnt() {
    return (
      this.leftTailIdx -
      this.leftHeadIdx +
      this.rightTailIdx -
      this.rightHeadIdx
    );
  }

  isLeftEmpty() {
    return this.leftHeadIdx === this.leftTailIdx;
  }

  isRightEmty() {
    return this.rightHeadIdx === this.rightTailIdx;
  }

  isEmpty() {
    return this.isLeftEmpty() && this.isRightEmty();
  }

  // 앞에 넣기
  pushLeft(item) {
    this.left[this.leftTailIdx] = item;
    this.leftTailIdx++;
  }

  // 끝에 넣기
  pushRight(item) {
    this.right[this.rightTailIdx] = item;
    this.rightTailIdx++;
  }

  // 처음 정수 제거 후 출력
  popLeft() {
    if (this.isEmpty()) return -1;
    if (!this.isLeftEmpty()) return this.left[--this.leftTailIdx];
    return this.right[this.rightHeadIdx++];
  }

  // 처음 정수 출력
  getLeft() {
    if (this.isEmpty()) return -1;
    if (!this.isLeftEmpty()) return this.left[this.leftTailIdx - 1];
    return this.right[this.rightHeadIdx];
  }

  // 마지막 정수 제거 후 출력
  popRight() {
    if (this.isEmpty()) return -1;
    if (!this.isRightEmty()) return this.right[--this.rightTailIdx];
    return this.left[this.leftHeadIdx++];
  }

  // 마지막 정수 출력
  getRight() {
    if (this.isEmpty()) return -1;
    if (!this.isRightEmty()) return this.right[this.rightTailIdx - 1];
    return this.left[this.leftHeadIdx];
  }
}

function solution(input) {
  const dequeue = new Dequeue();

  const execute = (cmd, num) => {
    switch (cmd) {
      case '1':
        dequeue.pushLeft(num);
        break;

      case '2':
        dequeue.pushRight(num);
        break;

      case '3':
        answer.push(dequeue.popLeft());
        break;

      case '4':
        answer.push(dequeue.popRight());
        break;

      case '5':
        answer.push(dequeue.getNumCnt());
        break;

      case '6':
        answer.push(dequeue.isEmpty() ? 1 : 0);
        break;

      case '7':
        answer.push(dequeue.getLeft());
        break;

      case '8':
        answer.push(dequeue.getRight());
        break;

      default:
        break;
    }
  };

  const answer = [];
  input.forEach((data) => {
    const [cmd, num] = data.split(' ');
    execute(cmd, num);
  });

  return answer.join('\n');
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .split('\n')
  .slice(1);
console.log(solution(input));
