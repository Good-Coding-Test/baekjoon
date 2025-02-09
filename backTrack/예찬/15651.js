const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const answer = [];

function DFS(array) {
  if (array.length === M) {
    answer.push(array.join(" "));
    return;
  }

  for (let i = 1; i <= N; i++) {
    DFS([...array, i]);
  }
}

for (let i = 1; i <= N; i++) {
  DFS([i]);
}

console.log(answer.join("\n"));
