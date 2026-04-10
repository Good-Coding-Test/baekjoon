let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const T = +input[0];
input = input.slice(1);
let result = [];

for (let i = 0; i < T; i++) {
  const N = +input[0];
  input = input.slice(1);
  let parent = {};
  let size = {};

  function find(node) {
    if (parent[node] !== node) parent[node] = find(parent[node]);

    return parent[node];
  }

  function union(a, b) {
    let rootA = find(a);
    let rootB = find(b);

    if (rootA !== rootB) {
      parent[rootB] = rootA;
      size[rootA] += size[rootB];
    }

    return size[rootA];
  }

  for (let j = 0; j < N; j++) {
    const [a, b] = input[j].split(" ");

    if (!parent[a]) {
      parent[a] = a;
      size[a] = 1;
    }

    if (!parent[b]) {
      parent[b] = b;
      size[b] = 1;
    }

    result.push(union(a, b));
  }

  input = input.slice(N);
}

console.log(result.join("\n"));
