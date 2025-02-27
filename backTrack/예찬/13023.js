const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const relation = input.slice(1).map((item) => item.split(" ").map(Number));
const graph = Array.from({ length: N + 1 }, () => []);
let visited = Array(N).fill(false);
let answer = 0;

for (let r of relation) {
  const [a, b] = r;
  graph[a].push(b);
  graph[b].push(a);
}

function dfs(index, depth) {
  if (depth === 5) {
    answer = 1;
    return;
  }

  for (let node of graph[index]) {
    if (visited[node]) continue;
    visited[node] = true;
    dfs(node, depth + 1);
    visited[node] = false;
  }
}

for (let i = 0; i < N; i++) {
  visited[i] = true;
  dfs(i, 1);
  visited[i] = false;
  if (answer) break;
}

console.log(answer);
