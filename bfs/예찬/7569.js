const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [M, N, H] = input[0].split(" ").map(Number);

class Queue {
  constructor() {
    this.head = 0;
    this.tail = 0;
    this.queue = {};
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
}

const dx = [-1, 0, 0, 1, 0, 0];
const dy = [0, -1, 1, 0, 0, 0];
const dh = [0, 0, 0, 0, -1, 1];
let map = [];

for (let i = 0; i < H; i++) {
  let tmp = [];
  for (let j = i * N + 1; j < i * N + N + 1; j++) {
    tmp.push(input[j].split(" ").map(Number));
  }
  map.push(tmp);
}

const needVisit = new Queue();

for (let i = 0; i < H; i++) {
  for (let j = 0; j < N; j++) {
    for (let k = 0; k < M; k++) {
      if (map[i][j][k] === 1) needVisit.enQueue([i, j, k]);
    }
  }
}

while (needVisit.size()) {
  const [z, y, x] = needVisit.deQueue();
  for (let a = 0; a < 6; a++) {
    const nx = x + dx[a];
    const ny = y + dy[a];
    const nz = z + dh[a];

    if (
      nx >= 0 &&
      ny >= 0 &&
      nz >= 0 &&
      nx < M &&
      ny < N &&
      nz < H &&
      !map[nz][ny][nx]
    ) {
      needVisit.enQueue([nz, ny, nx]);
      map[nz][ny][nx] = map[z][y][x] + 1;
    }
  }
}

if (map.flat().flat().includes(0)) {
  console.log(-1);
  return;
}

console.log(Math.max(...map.flat().flat()) - 1);
