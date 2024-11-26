class Queue {
  items = [];
  front = 0;
  rear = 0;

  get length() {
    return this.rear - this.front;
  }

  enqueue(item) {
    this.items[this.rear++] = item;
  }

  dequeue() {
    return this.items[this.front++];
  }
}

function solution(input) {
  const [N, K] = input.split(' ').map(Number);

  const queue = new Queue();
  for (let i = 1; i <= N; i++) queue.enqueue(i);

  // 남은 청솔모의 수가 K마리 이상인 경우 반복
  while (queue.length >= K) {
    // 가장 앞 뒤로 보내기
    queue.enqueue(queue.dequeue());
    // 맨 앞에서 K-1마리 제거
    for (let i = 1; i < K; i++) queue.dequeue();
  }

  console.log(queue.dequeue());
}

const fs = require('fs');
const fileName = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(fileName).toString().trim();

solution(input);
