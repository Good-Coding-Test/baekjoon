const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const n = parseInt(input[0]);
let map = input.slice(1).map((item) => item.split("").map(Number));
let danji = 0;

const dx = [-1, 0, 0, 1];
const dy = [0, -1, 1, 0];
let danjiNumber = [];

function DFS(count, x, y) {
  map[x][y] = 0;
  count++;
  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (nx >= 0 && ny >= 0 && nx < n && ny < n && map[nx][ny]) {
      count = DFS(count, nx, ny);
    }
  }
  return count;
}

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (map[i][j]) {
      danji++;
      const tmp = DFS(0, i, j);
      tmp && danjiNumber.push(tmp);
    }
  }
}

console.log(danji);
danjiNumber.sort((a, b) => a - b);
danjiNumber.forEach((item) => console.log(item));
