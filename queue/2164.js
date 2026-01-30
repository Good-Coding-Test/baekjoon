const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const N = +input;

class Queue {
  constructor() {
    this.queue = {};
    this.head = 0;
    this.tail = 0;
  }

  enQueue(item) {
    this.queue[this.tail++] = item;
  }

  deQueue() {
    const item = this.queue[this.head];
    delete this.queue[this.head++];
    if (this.head === this.tail) {
      this.head = 0;
      this.tail = 0;
    }
    return item;
  }

  size() {
    return this.tail - this.head;
  }

  peek() {
    return this.queue[this.head];
  }
}

let arr = new Queue();

// 카드 더미 생성: O(N)
for (let i = 1; i <= N; i++) {
  arr.enQueue(i);
}

// 한 장 남을 때까지 동작 반복: O(N)
while (arr.size() > 1) {
  // 맨 위에서 버리기: O(1)
  arr.deQueue();

  // 맨 위 카드를 맨 뒤로 넣기: O(1) + O(1)
  if (arr.size() > 1) {
    arr.enQueue(arr.deQueue());
  }
}

console.log(arr.peek());
