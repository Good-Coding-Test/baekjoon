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
  let graph = Array.from({ length: V + 1 }, () => []);

  for (let j = 0; j < E; j++) {
    let [a, b] = input[j].split(" ").map(Number);

    graph[a].push(b);
    graph[b].push(a);
  }

  let vertex = Array(V + 1).fill(0);
  let flag = true;

  function bfs(start) {
    let needVisit = [start];

    while (needVisit.length) {
      const cur = needVisit.shift();
      for (let v of graph[cur]) {
        if (!vertex[v]) {
          vertex[start] === 1 ? (vertex[v] = -1) : (vertex[v] = 1);
          needVisit.push();
        } else if (vertex[v] === vertex[start]) {
          return false;
        }
      }
    }
    return true;
  }

  for (let k = 0; k < V; k++) {
    if (!vertex[k]) {
      if (!bfs(k)) {
        flag = false;
        break;
      }
    }
  }

  answer.push(flag ? "YES" : "NO");
}

console.log(answer.join("\n"));
