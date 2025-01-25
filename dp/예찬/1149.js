const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = parseInt(input[0]);
const rgb = input.slice(1).map((item) => item.split(" ").map(Number));
const min = rgb.map((item) => [...item].fill(Infinity));
min[0] = rgb[0];

function DP(x, y) {
  for (let i = 0; i < 3; i++) {
    if (i !== y && min[x][y] + rgb[x + 1][i] < min[x + 1][i])
      min[x + 1][i] = min[x][y] + rgb[x + 1][i];
  }
}

for (let i = 0; i < N - 1; i++) {
  for (let j = 0; j < 3; j++) {
    DP(i, j);
  }
}

console.log(Math.min(...min[N - 1]));
