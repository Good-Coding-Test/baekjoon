const { count } = require("console");

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map((e) => +e);
const info = Array.from({ length: N + 1 }, () => []);
const visited = Array.from({ length: N + 1 }, () => false);
for (let i = 1; i <= M; i++) {
  const [a, b] = input[i].split(" ").map((e) => +e);
  info[a].push(b);
  info[b].push(a);
}
const DFS = (K) => {
  if (visited[K]) return;
  visited[K] = true;
  for (let i = 0; i < info[K].length; i++) {
    if (!visited[info[K][i]]) {
      DFS(info[K][i]);
    }
  }
};
let cnt = 0;
for (let i = 1; i <= N; i++) {
  if (!visited[i]) {
    DFS(i);
    cnt++;
  }
}
console.log(cnt);
