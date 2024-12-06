const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, S] = input[0].split(" ").map(Number);
const array = input[1].split(" ").map(Number);
let count = 0;

const sumArray = (arr) => {
  if (arr.length === 0) return null;
  if (arr.length === 1) return arr[0];

  return arr.reduce((previous, current) => current + previous);
};

const DFS = (arr, index) => {
  if (sumArray(arr) === S) count++;

  for (let i = index + 1; i < N; i++) {
    DFS([...arr, array[i]], i);
  }
};

DFS([], -1);

console.log(count);
