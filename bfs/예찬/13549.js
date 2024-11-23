const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split(" ");

class Queue {
  constructor() {
    this.queue = [];
    this.head = 0;
    this.tail = 0;
  }

  enQueue(element) {
    this.queue[this.tail++] = element;
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

const subin = Number(input[0]);
const sister = Number(input[1]);
const visited = Array(100001).fill(-1);

const needVisit = new Queue();

needVisit.enQueue(subin);
visited[subin] = 0;

while (!needVisit.isEmpty()) {
  const now = needVisit.deQueue();
  if (now === sister) {
    console.log(visited[now]);
    break;
  }

  for (let i = 0; i < 3; i++) {
    if (i === 0) {
      if (visited[now * 2] === -1 && now * 2 <= 100000) {
        needVisit.enQueue(now * 2);
        visited[now * 2] = visited[now];
      }
    } else if (i === 1) {
      if (now - 1 >= 0 && visited[now - 1] === -1) {
        needVisit.enQueue(now - 1);
        visited[now - 1] = visited[now] + 1;
      }
    } else {
      if (now + 1 <= 100000 && visited[now + 1] === -1) {
        needVisit.enQueue(now + 1);
        visited[now + 1] = visited[now] + 1;
      }
    }
  }
}
