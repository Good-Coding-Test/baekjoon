const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const map = input.slice(1).map((item) => item.split(""));
let answer = 0;
const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

function DFS(x, y, visited, count) {
  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (nx >= 0 && ny >= 0 && nx < N && ny < M && !visited.has(map[nx][ny])) {
      visited.add(map[nx][ny]);
      DFS(nx, ny, visited, count + 1);
      visited.delete(map[nx][ny]);
    }
  }
  answer = Math.max(answer, count);
}

const visited = new Set();
visited.add(map[0][0]);
DFS(0, 0, visited, 1);

console.log(answer);
