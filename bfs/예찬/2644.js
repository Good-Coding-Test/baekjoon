const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = parseInt(input[0]);
const [a, b] = input[1].split(" ").map(Number);
const M = parseInt(input[2]);
const relationship = input.slice(3).map((item) => item.split(" ").map(Number));
const relations = Array.from({ length: N + 1 }, () => []);

for (let r of relationship) {
  const [a, b] = r;

  relations[a].push(b);
  relations[b].push(a);
}

const number = Array(N + 1).fill(0);

function bfs(start, end) {
  let needVisit = [];
  needVisit.push(start);

  while (needVisit.length) {
    const node = needVisit.shift();

    for (let s of relations[node]) {
      if (number[s]) continue;
      number[s] = number[node] + 1;
      if (s === end) return;
      needVisit.push(s);
    }
  }
}

bfs(a, b);
console.log(number[b] ? number[b] : -1);
