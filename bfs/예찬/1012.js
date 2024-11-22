const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const test = parseInt(input[0]);
const testCase = input.slice(1);
let step = 0; // 양배추 개수를 이용하여 어떤 테스트케이스를 적용 중인지 식별
const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

class Queue {
  constructor() {
    this.head = 0;
    this.tail = 0;
    this.queue = [];
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

for (let i = 0; i < test; i++) {
  let count = 0;

  const [m, n, cabbage] = testCase[step].split(" ").map(Number);

  const cabbages = testCase
    .slice(step + 1, step + 1 + cabbage)
    .map((item) => item.split(" ").map(Number));
  step += cabbage + 1;

  const position = new Set(cabbages.map(([x, y]) => `${x},${y}`)); // 양배추 좌표를 set으로 저장

  cabbages.forEach((item) => {
    const [x, y] = item;

    if (!position.has(`${x},${y}`)) return; // 이미 이전 BFS에 의해 방문됐다면 스킵.
    const needVisit = new Queue();
    needVisit.enQueue(item);

    // 방문해야 할 배추가 있다면 반복
    while (!needVisit.isEmpty()) {
      const [x1, y1] = needVisit.deQueue();
      if (!position.has(`${x1},${y1}`)) continue;
      position.delete(`${x1},${y1}`);

      for (let i = 0; i < 4; i++) {
        const nx = x1 + dx[i];
        const ny = y1 + dy[i];

        if (
          nx >= 0 &&
          ny >= 0 &&
          nx < m &&
          ny < n &&
          position.has(`${nx},${ny}`)
        ) {
          needVisit.enQueue([nx, ny]);
        }
      }
    }
    count++;
  });

  console.log(count);
}
