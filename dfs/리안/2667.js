const { count } = require("console");

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

class Point {
  constructor(_x, _y) {
    this.x = _x;
    this.y = _y;
  }
}
const N = +input[0];
const board = [];
const counts = [];
let cnt = 0;
let totalCnt = 0;
const visited = Array.from({ length: N }, () => Array(N).fill(false));
for (let i = 1; i <= N; i++) {
  board.push(input[i].split("").map((e) => +e));
}
const di = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];
const DFS = (point) => {
  if (visited[point.y][point.x]) return;
  visited[point.y][point.x] = true;
  cnt++;
  for (let i = 0; i < 4; i++) {
    const [x, y] = di[i];
    const dx = point.x + x;
    const dy = point.y + y;
    if (
      dx >= 0 &&
      dx < N &&
      dy >= 0 &&
      dy < N &&
      !visited[dy][dx] &&
      board[dy][dx] === 1
    ) {
      DFS(new Point(dx, dy));
    }
  }
};

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    cnt = 0;
    if (!visited[i][j] && board[i][j] === 1) {
      totalCnt++;
      DFS(new Point(j, i), 0);
      counts.push(cnt);
    }
  }
}
console.log(totalCnt);

const result = counts.sort((a, b) => a - b).join("\n");
console.log(result);
