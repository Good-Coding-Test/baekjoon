const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = parseInt(input[0]);
const board = input.slice(1).map((item) => item.split(" ").map(Number));
let min = board.map((item) => [...item].fill(Infinity));
let max = board.map((item) => [...item].fill(0));
min[0] = board[0];
max[0] = board[0];

function DP(x, y) {
  for (let i = 0; i < 3; i++) {
    if (y - 1 + i >= 0 && y - 1 + i < 3) {
      if (max[x + 1][y - 1 + i] < board[x + 1][y - 1 + i] + max[x][y])
        max[x + 1][y - 1 + i] = board[x + 1][y - 1 + i] + max[x][y];
      if (min[x + 1][y - 1 + i] > board[x + 1][y - 1 + i] + min[x][y])
        min[x + 1][y - 1 + i] = board[x + 1][y - 1 + i] + min[x][y];
    }
  }
}

for (let i = 0; i < N - 1; i++) {
  for (let j = 0; j < 3; j++) {
    DP(i, j);
  }
}

console.log(Math.max(...max[N - 1].flat()), Math.min(...min[N - 1].flat()));
