const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

class Point {
  constructor(_x, _y, _day) {
    this.x = _x;
    this.y = _y;
    this.day = _day;
  }
}

const [w, h] = input[0].split(" ").map((e) => +e);
const board = [];
const visited = Array.from({ length: h }, () => Array(w).fill(false));

for (let i = 1; i <= h; i++) board.push(input[i].split(" ").map((e) => +e));
const countTotalTomato = (arr, W, H) => {
  let cnt = 0;
  for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {
      if (arr[i][j] === -1) cnt++;
    }
  }
  return W * H - cnt;
};

const queue = [];

for (let i = 0; i < h; i++) {
  for (let j = 0; j < w; j++) {
    if (board[i][j] === 1 && !visited[i][j]) {
      queue.push(new Point(j, i, 0));
      visited[i][j] = true;
    }
  }
}
const di = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];
let flag = false;
let idx = 0;
let cnt = 0;

const tomatoCnt = countTotalTomato(board, w, h);

while (queue.length > idx) {
  const q = queue[idx++];
  board[q.y][q.x] = 1;
  cnt++;

  if (cnt === tomatoCnt) {
    console.log(q.day);
    flag = true;
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
      board[dy][dx] === 0
    ) {
      queue.push(new Point(dx, dy, q.day + 1));
      visited[dy][dx] = true;
    }
  }
}
if (!flag) console.log(-1);
