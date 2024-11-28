const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);

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

// 인접 리스트 생성
// 1번 인덱스부터 사용, 인덱스는 정점 번호, 요소들은 연결된 정점들을 의미함.
const lines = Array.from({ length: N + 1 }, () => []);
for (let i = 1; i <= M; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  lines[a].push(b);
  lines[b].push(a);
}
const needVisit = new Queue();
const selected = new Set();
let count = 0;

const BFS = (n) => {
  needVisit.enQueue(n);

  while (!needVisit.isEmpty()) {
    const node = needVisit.deQueue();
    for (let line of lines[node]) {
      // 이미 방문된 정점이 아니라면 추가
      if (!selected.has(line)) {
        needVisit.enQueue(line);
        selected.add(line);
      }
    }
  }

  count++;
};

for (let i = 1; i <= N; i++) {
  if (!selected.has(i)) BFS(i);
}

console.log(count);
