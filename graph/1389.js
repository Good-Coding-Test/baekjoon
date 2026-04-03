const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const asc = input.slice(1).map((item) => item.split(" ").map(Number));
let graph = Array.from({ length: N + 1 }, () => new Set());
let min = Infinity;
let answer = 0;

for (let [a, b] of asc) {
  graph[a].add(b);
  graph[b].add(a);
}

for (let i = 1; i <= N; i++) {
  let count = getKB(i);

  if (count < min) {
    answer = i;
    min = count;
  }
}

function getKB(node) {
  let visited = Array(N + 1).fill(-1);
  visited[node] = 0;
  let queue = [node];
  let result = 0;

  while (queue.length) {
    const n = queue.shift();

    for (let next of graph[n]) {
      if (visited[next] !== -1) continue;
      visited[next] = visited[n] + 1;
      result += visited[next];
      queue.push(next);
    }
  }

  return result;
}

console.log(answer);
