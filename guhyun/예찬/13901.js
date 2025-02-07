const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const K = parseInt(input[1]);
const wall = input.slice(2, 2 + K).map((item) => item.split(" ").map(Number));
let [x, y] = input[2 + K].split(" ").map(Number);
const direction = input[input.length - 1].split(" ").map(Number);
const dx = [null, -1, 1, 0, 0];
const dy = [null, 0, 0, -1, 1];
let map = Array.from({ length: N }, () => Array(M).fill(0));
for (const [a, b] of wall) {
  map[a][b] = 1;
}

let index = 0;
let count = 0;
map[x][y] = 1;
while (count !== 4) {
  const dirIndex = index % 4;
  const nx = x + dx[direction[dirIndex]];
  const ny = y + dy[direction[dirIndex]];

  if (nx >= 0 && ny >= 0 && nx < N && ny < M && !map[nx][ny]) {
    x = nx;
    y = ny;
    count = 0;
    map[nx][ny] = 1;
  } else {
    index++;
    count++;
  }
}

console.log(x, y);
