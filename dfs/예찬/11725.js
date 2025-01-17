const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = parseInt(input[0]);
const tree = Array.from({ length: N + 1 }, () => []);
const lines = input.slice(1).map((item) => item.split(" ").map(Number));
const answer = [];

for (let i = 0; i < N - 1; i++) {
  const [a, b] = lines[i];
  tree[a].push(b);
  tree[b].push(a);
}

function DFS() {
  const visited = new Set();
  let needVisit = [];

  needVisit.push(1);

  while (needVisit.length) {
    const n = needVisit.shift();
    visited.add(n);

    for (node of tree[n]) {
      if (!node) continue;
      if (visited.has(node)) answer[n] = node;
      else needVisit = [node, ...needVisit];
    }
  }
}

DFS();
let ans = "";
for (let i = 2; i <= N; i++) {
  ans += answer[i] + "\n";
}

console.log(ans);
