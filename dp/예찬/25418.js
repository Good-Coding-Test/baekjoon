const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

class Queue {
  constructor() {
    this.head = 0;
    this.queue = [];
    this.tail = 0;
  }

  enQueue(el) {
    this.queue[this.tail++] = el;
  }

  deQueue() {
    const element = this.queue[this.head];
    delete this.queue[this.head++];
    return element;
  }

  isEmpty() {
    return this.head === this.tail;
  }
}

const [A, K] = input.split(" ").map(Number);
let min = new Array(K + 1).fill(Infinity);

function dp() {
  min[A] = 0;
  let needVisit = new Queue();
  needVisit.enQueue(A);

  while (!needVisit.isEmpty()) {
    const current = needVisit.deQueue();
    if (
      current * 2 <= K &&
      (min[current * 2] === Infinity || min[current] + 1 < min[current * 2])
    ) {
      min[current * 2] = min[current] + 1;
      needVisit.enQueue(current * 2);
    }
    if (
      current + 1 <= K &&
      (min[current + 1] === Infinity || min[current] + 1 < min[current + 1])
    ) {
      min[current + 1] = min[current] + 1;
      needVisit.enQueue(current + 1);
    }
  }
}

dp(A);
console.log(min[K]);
