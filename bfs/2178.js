const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");
class Point {
  constructor(_x, _y, _step) {
    this.x = _x;
    this.y = _y;
    this.step = _step;
  }
}
const [h, w] = input[0].split(" ").map((e) => +e);
const visited = Array.from({ length: h }, () => Array(w).fill(false));

const board = [];
for (let i = 1; i <= h; i++) board.push(input[i].split("").map((e) => +e));

const queue = [];
queue.push(new Point(0, 0, 0));

visited[0][0] = true;

const di = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];

while (queue.length > 0) {
  const q = queue.shift();

  if (q.x === w - 1 && q.y === h - 1) {
    console.log(q.step + 1);
    break;
  }
  for (let i = 0; i < 4; i++) {
    const [x, y] = di[i];
    const dx = q.x + x;
    const dy = q.y + y;
    if (
      dx >= 0 &&
      dx < w &&
      dy >= 0 &&
      dy < h &&
      !visited[dy][dx] &&
      board[dy][dx] === 1
    ) {
      queue.push(new Point(dx, dy, q.step + 1));
      visited[dy][dx] = true;
    }
  }
}
