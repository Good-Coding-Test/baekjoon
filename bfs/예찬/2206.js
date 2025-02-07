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

  enQueue(el) {
    this.queue[this.tail++] = el;
  }

  deQueue() {
    const el = this.queue[this.head];
    delete this.queue[this.head++];
    return el;
  }

  isEmpty() {
    return this.head === this.tail;
  }
}

const [N, M] = input[0].split(" ").map(Number);
const map = input.slice(1).map((item) => item.split("").map(Number));
const min = Array.from({ length: 2 }, () =>
  Array.from({ length: N }, () => Array(M).fill(Infinity))
);

const dx = [-1, 0, 0, 1];
const dy = [0, 1, -1, 0];

function BFS() {
  let needVisit = new Queue();
  needVisit.enQueue([0, 0, 0]);
  min[0][0][0] = 1;

  while (!needVisit.isEmpty()) {
    const [x, y, broke] = needVisit.deQueue();

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < N &&
        ny < M &&
        min[broke][x][y] + 1 < min[broke][nx][ny]
      ) {
        if (map[nx][ny] === 1) {
          if (!broke) {
            min[1][nx][ny] = min[0][x][y] + 1;
            needVisit.enQueue([nx, ny, 1]);
          }
        } else {
          min[broke][nx][ny] = min[broke][x][y] + 1;
          needVisit.enQueue([nx, ny, broke]);
        }
      }
    }
  }
}

BFS();

if (min[0][N - 1][M - 1] === Infinity && min[1][N - 1][M - 1] === Infinity)
  console.log(-1);
else console.log(Math.min(min[0][N - 1][M - 1], min[1][N - 1][M - 1]));
