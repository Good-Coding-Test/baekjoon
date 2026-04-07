const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const map = input.slice(1).map((item) => item.split(""));
const dx = [-1, 0, 0, 1];
const dy = [0, 1, -1, 0];
let answer = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (map[i][j] === "L") answer = Math.max(bfs(i, j), answer);
  }
}

function bfs(x, y) {
  let needVisit = [[x, y]];
  let visited = Array.from({ length: N }, () => Array(M).fill(-1));
  visited[x][y] = 0;

  while (needVisit.length) {
    const [cx, cy] = needVisit.shift();

    for (let i = 0; i < 4; i++) {
      const nx = cx + dx[i];
      const ny = cy + dy[i];

      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < N &&
        ny < M &&
        visited[nx][ny] === -1 &&
        map[nx][ny] === "L"
      ) {
        visited[nx][ny] = visited[cx][cy] + 1;
        needVisit.push([nx, ny]);
      }
    }
  }

  let max = Math.max(...visited.flat());
  return max;
}

console.log(answer);
