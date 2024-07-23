function solution(input) {
  class Node {
    constructor(value) {
      this.value = value;
      this.prev = null;
      this.next = null;
    }
  }

  class Deque {
    constructor() {
      this.clear();
    }

    isEmpty() {
      return this.count === 0;
    }

    clear() {
      this.front = null;
      this.rear = null;
      this.count = 0;
    }

    unshift(value) {
      const node = new Node(value);

      if (this.count === 0) {
        this.front = node;
        this.rear = node;
      } else {
        const nextNode = this.front;
        nextNode.prev = node;
        node.next = nextNode;
        this.front = node;
      }

      this.count++;
      return node.value;
    }

    shift() {
      if (this.count === 0) return null;

      const frontNode = this.front;

      if (this.count === 1) this.clear();
      else {
        this.front = frontNode.next;
        this.front.prev = null;
        this.count--;
      }

      return frontNode.value;
    }

    push(value) {
      const node = new Node(value);

      if (this.count === 0) {
        this.front = node;
        this.rear = node;
      } else {
        const prevNode = this.rear;
        prevNode.next = node;
        node.prev = prevNode;
        this.rear = node;
      }

      this.count++;
      return node.value;
    }

    pop() {
      if (this.count === 0) return null;

      const rearNode = this.rear;
      if (this.count === 1) this.clear();
      else {
        this.rear = rearNode.prev;
        this.rear.next = null;
        this.count--;
      }

      return rearNode.value;
    }
  }

  const [N, K, M] = input;

  // 앉아 있는 사람들
  const people = new Deque();
  for (let i = 1; i <= N; i++) {
    people.push(i);
  }

  const answer = [];
  // direction: 방향 => true: 오른쪽, false: 왼쪽
  let direction = true;
  // cnt: 제거한 사람 수
  let cnt = 0;
  while (!people.isEmpty()) {
    if (direction) {
      for (let i = 0; i < K - 1; i++) {
        people.push(people.shift());
      }
    } else {
      for (let i = 0; i < K; i++) {
        people.unshift(people.pop());
      }
    }

    answer.push(people.shift());
    cnt++;
    if (cnt % M === 0) direction = !direction;
  }

  console.log(answer.join('\n'));
}

function solution2(input) {
  class Node {
    constructor(value) {
      this.value = value;
      this.prev = null;
      this.next = null;
    }
  }

  class CircularLinkedList {
    constructor() {
      this.clear();
    }

    clear() {
      this.front = null;
      this.rear = null;
      this.pointer = null;
      this.count = 0;
    }

    insert(value) {
      const node = new Node(value);

      if (this.count === 0) {
        this.front = node;
        this.rear = node;
        this.pointer = new Node(null);
        this.pointer.next = this.front;
        this.pointer.prev = this.rear;
      } else {
        this.rear.next = node;
        node.prev = this.rear;
        this.front.prev = node;
        node.next = this.front;
        this.rear = node;
      }

      this.count++;
    }

    rotate(direction, cnt) {
      if (direction) {
        for (let i = 0; i < cnt; i++) {
          this.pointer = this.pointer.next;
        }
      } else {
        for (let i = 0; i < cnt; i++) {
          this.pointer = this.pointer.prev;
        }
      }
    }

    remove() {
      if (this.count === 0) return null;

      const removeNode = this.pointer;
      this.count--;

      if (this.count === 0) {
        this.clear();
        return removeNode.value;
      }

      if (this.count === 1) {
        this.front = this.pointer.next;
        this.rear = this.pointer.prev;
      }

      this.pointer.prev.next = this.pointer.next;
      this.pointer.next.prev = this.pointer.prev;
      return removeNode.value;
    }
  }

  const [N, K, M] = input;

  const people = new CircularLinkedList();
  for (let i = 1; i <= N; i++) {
    people.insert(i);
  }

  const answer = [];
  let direction = true;
  let cnt = 0;
  while (people.count !== 0) {
    people.rotate(direction, K);
    answer.push(people.remove());

    cnt++;
    if (cnt % M === 0) direction = !direction;
  }

  console.log(answer.join('\n'));
}

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number);
solution2(input);
