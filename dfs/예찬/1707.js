let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

let answer = [];

const K = +input[0];
input = input.slice(1);

for (let i = 0; i < K; i++) {
  const [V, E] = input[0].split(" ").map(Number);
  input = input.slice(1);

  let graph = {};

  for (let j = 0; j < E; j++) {
    const [a, b] = input[j].split(" ").map(Number);

    if (!graph[a]) graph[a] = [];
    if (!graph[b]) graph[b] = [];

    graph[a].push(b);
    graph[b].push(a);
  }

  let vertex = Array(V + 1).fill(0);
  let flag = true;

  function dfs(start) {
    for (let v of graph[start]) {
      if (!vertex[v]) {
        vertex[v] = -vertex[start];
        if (!dfs(v)) return false;
      } else if (vertex[v] === vertex[start]) {
        return false;
      }
    }
    return true;
  }

  for (let k = 1; k <= V; k++) {
    if (!vertex[k]) {
      vertex[k] = 1;
      if (!dfs(k)) {
        flag = false;
        break;
      }
    }
  }

  answer.push(flag ? "YES" : "NO");

  input = input.slice(E);
}

console.log(answer.join("\n"));
