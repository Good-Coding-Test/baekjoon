const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = parseInt(input[0]);
const numbers = input[1].split(" ").map(Number);
let max = 0;

function dfs(arr, indexArr) {
  if (arr.length === N) {
    max = Math.max(max, calc(arr));
    return;
  }

  for (let i = 0; i < N; i++) {
    if (indexArr.includes(i)) continue;
    dfs([...arr, numbers[i]], [...indexArr, i]);
  }
}

function calc(array) {
  let value = 0;
  for (let i = 0; i < N - 1; i++) {
    value += Math.abs(array[i] - array[i + 1]);
  }
  return value;
}
dfs([], []);
console.log(max);
