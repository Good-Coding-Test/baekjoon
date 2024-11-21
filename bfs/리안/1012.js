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
const T = +input[0];

let line = 1;
const di = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];
for (let t = 0; t < T; t++) {
  let cnt = 0;

  const [w, h, k] = input[line].split(" ").map((e) => +e);
  const board = Array.from({ length: h }, () => Array(w).fill(0));
  const visited = Array.from({ length: h }, () => Array(w).fill(false));
  for (let i = line + 1; i <= line + k; i++) {
    const [x, y] = input[i].split(" ").map((e) => +e);
    board[y][x] = 1;
  }

  for (let i = 0; i < h; i++)
    for (let j = 0; j < w; j++) {
      if (board[i][j] === 1 && !visited[i][j]) {
        cnt++;
        const queue = [];
        let idx = 0;
        queue.push(new Point(j, i));

        while (queue.length > idx) {
          const q = queue[idx++];
          for (let k = 0; k < 4; k++) {
            const [x, y] = di[k];
            const dx = q.x + x;
            const dy = q.y + y;
            if (
              dx >= 0 &&
              dx < w &&
              dy >= 0 &&
              dy < h &&
              board[dy][dx] === 1 &&
              !visited[dy][dx]
            ) {
              queue.push(new Point(dx, dy));
              visited[dy][dx] = true;
            }
          }
        }
      }
    }
  console.log(cnt);
  line += k + 1;
}
