const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, Q] = input[0].split(" ").map(Number);
const usado = input.slice(1, N).map((item) => item.split(" ").map(Number));
const questions = input.slice(N).map((item) => item.split(" ").map(Number));

const graph = {};

for (let [p, q, r] of usado) {
  if (!graph[p]) graph[p] = [];
  if (!graph[q]) graph[q] = [];
  graph[p].push([q, r]);
  graph[q].push([p, r]);
}

for (let [k, v] of questions) {
  let count = 0;
  const visited = new Set();
  const queue = [v];
  visited.add(v);

  while (queue.length) {
    const video = queue.shift();

    for (let [next, usado] of graph[video]) {
      if (!visited.has(next) && usado >= k) {
        visited.add(next);
        queue.push(next);
        count++;
      }
    }
  }
  console.log(count);
}
