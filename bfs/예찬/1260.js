const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

class Queue {
  constructor() {
    this.queue = [];
    this.head = 0;
    this.tail = 0;
  }

  q_push(element) {
    this.queue[this.tail++] = element;
  }

  q_pop() {
    const element = this.queue[this.head];
    delete this.queue[this.head++];
    return element;
  }

  isEmpty() {
    return this.head === this.tail;
  }
}

const [N, M, V] = input[0].split(" ").map(Number);
const lines = input.slice(1).map((item) => item.split(" ").map(Number));
const list = Array.from({ length: N + 1 }, () => []);

for (let i = 0; i < M; i++) {
  const [a, b] = lines[i];
  list[a].push(b);
  list[b].push(a);
}

function DFS() {
  let visited = [];
  let needVisit = [];

  needVisit.push(V);
  while (needVisit.length) {
    const node = needVisit.shift();
    if (!visited.includes(node)) {
      visited.push(node);
      needVisit = [...list[node].sort((a, b) => a - b), ...needVisit];
    }
  }
  return visited;
}

function BFS() {
  let visited = [];
  let needVisit = [];

  needVisit.push(V);
  while (needVisit.length) {
    const node = needVisit.shift();
    if (!visited.includes(node)) {
      visited.push(node);
      needVisit = [...needVisit, ...list[node].sort((a, b) => a - b)];
    }
  }
  return visited;
}

console.log(DFS().join(" "));
console.log(BFS().join(" "));
