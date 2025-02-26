const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = parseInt(input[0]);
const cost = input.slice(1).map((item) => item.split(" ").map(Number));
let min = Infinity;

function dfs(arr) {
  if (arr.length === N) {
    min = Math.min(min, calculate(arr));
    return;
  }

  for (let i = 0; i < N; i++) {
    if (
      arr.includes(i) ||
      (arr.length === N - 1 && !cost[i][arr[0]]) ||
      (arr.length && !cost[arr[arr.length - 1]][i])
    )
      continue;
    dfs([...arr, i]);
  }
}

function calculate(arr) {
  let value = 0;
  for (let i = 1; i < N; i++) {
    value += cost[arr[i - 1]][arr[i]];
  }
  value += cost[arr[N - 1]][arr[0]];

  return value;
}

dfs([]);
console.log(min);
