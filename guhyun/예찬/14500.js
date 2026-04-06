const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const map = input.slice(1).map((item) => item.split(" ").map(Number));
const dx = [-1, 0, 0, 1];
const dy = [0, 1, -1, 0];
let visited = Array.from({ length: N }, () => Array(M).fill(false));

let answer = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    visited[i][j] = true;
    dfs(i, j, 0, 0);
    visited[i][j] = false;
    checkT(i, j);
  }
}

function dfs(x, y, depth, sum) {
  if (depth === 4) {
    answer = Math.max(answer, sum);
    return;
  }
  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (nx >= 0 && ny >= 0 && nx < N && ny < M && !visited[nx][ny]) {
      visited[nx][ny] = true;
      dfs(nx, ny, depth + 1, sum + map[nx][ny]);
      visited[nx][ny] = false;
    }
  }
}

function checkT(x, y) {
  let sum = map[x][y];
  let cnt = 0;
  let min = Infinity;

  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (nx >= 0 && ny >= 0 && nx < N && ny < M) {
      cnt++;
      sum += map[nx][ny];
      min = Math.min(min, map[nx][ny]);
    }
  }

  if (cnt === 4) sum -= min;

  answer = Math.max(answer, sum);
}

console.log(answer);
