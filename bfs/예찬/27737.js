const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M, K] = input[0].split(" ").map(Number);
const map = input.slice(1).map((item) => item.split(" ").map(Number));
const visited = Array.from({ length: N }, () => Array(N).fill(false));

const dx = [-1, 0, 0, 1];
const dy = [0, -1, 1, 0];

function BFS(x, y) {
  let needVisit = [[x, y]];
  visited[x][y] = true;
  let count = 1;

  while (needVisit.length) {
    const [x, y] = needVisit.shift();

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < N &&
        ny < N &&
        map[nx][ny] === 0 &&
        !visited[nx][ny]
      ) {
        count++;
        visited[nx][ny] = true;
        needVisit.push([nx, ny]);
      }
    }
  }
  return count;
}

const areas = [];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (map[i][j] === 0 && !visited[i][j]) {
      areas.push(BFS(i, j));
    }
  }
}

areas.sort((a, b) => b - a);
let usedSpores = 0;

for (let area of areas) {
  const needSpores = Math.ceil(area / K);
  if (needSpores + usedSpores > M) {
    console.log("IMPOSSIBLE");
    return;
  }
  usedSpores += needSpores;
}

if (usedSpores === 0) {
  console.log("IMPOSSIBLE");
  return;
}

console.log("POSSIBLE");
console.log(M - usedSpores);
