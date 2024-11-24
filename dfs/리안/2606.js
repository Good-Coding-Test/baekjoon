const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");
const N = +input[0];
const info = Array.from({ length: N + 1 }, () => []);
const visited = Array.from({ length: N + 1 }, () => false);
const len = +input[1];

for (let i = 0; i < len; i++) {
  const [a, b] = input[i + 2].split(" ").map((e) => +e);
  info[a].push(b);
  info[b].push(a);
}
let cnt = -1;

const DFS = (k) => {
  if (visited[k]) return;
  visited[k] = true;
  cnt++;
  for (let i = 0; i < info[k].length; i++) DFS(info[k][i]);
};
DFS(1);
console.log(cnt);
