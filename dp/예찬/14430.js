const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const map = input.slice(1).map((item) => item.split(" ").map(Number));
const resource = map.map((item) => [...item].fill(0));

function DP(x, y) {
  if (x + 1 < N) {
    const tmp = map[x + 1][y] === 1 ? resource[x][y] + 1 : resource[x][y];
    resource[x + 1][y] = Math.max(tmp, resource[x + 1][y]);
  }
  if (y + 1 < M) {
    const tmp = map[x][y + 1] === 1 ? resource[x][y] + 1 : resource[x][y];
    resource[x][y + 1] = Math.max(tmp, resource[x][y + 1]);
  }
}

if (map[0][0] === 1) resource[0][0] = 1;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    DP(i, j);
  }
}

console.log(Math.max(...resource.flat()));
