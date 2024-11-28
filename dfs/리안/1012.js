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
const di = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];
const DFS = (p) => {
  if (visited[p.y][p.x]) return;
  visited[p.y][p.x] = true;

  for (let i = 0; i < 4; i++) {
    const [x, y] = di[i];
    const dx = p.x + x;
    const dy = p.y + y;
    if (
      dx >= 0 &&
      dx < w &&
      dy >= 0 &&
      dy < h &&
      !visited[dy][dx] &&
      board[dy][dx] === 1
    ) {
      DFS(new Point(dx, dy));
    }
  }
};
const T = +input[0];
let line = 1;
let w, h, k, board, visited;
const result = [];

for (let t = 0; t < T; t++) {
  [w, h, k] = input[line++].split(" ").map((e) => +e);

  //정보 초기황
  board = Array.from({ length: h }, () => Array.from({ length: w }, () => 0));
  visited = Array.from({ length: h }, () =>
    Array.from({ length: w }, () => false)
  );

  let cnt = 0;

  for (let i = line; i < line + k; i++) {
    const [x, y] = input[i].split(" ").map((e) => +e);
    board[y][x] = 1;
  }
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (!visited[i][j] && board[i][j] === 1) {
        DFS(new Point(j, i));

        cnt++;
      }
    }
  }
  result.push(cnt);
  line += k;
}
console.log(result.join("\n"));
