const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = parseInt(input[0]);
const M = parseInt(input[2]);

const A = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);
const X = input[3].split(" ").map(Number);

function binarySearch(target) {
  let start = 0;
  let end = N - 1;

  while (start <= end) {
    const mid = Math.floor((end + start) / 2);
    if (A[mid] === target) return 1;
    else if (A[mid] < target) start = mid + 1;
    else end = mid - 1;
  }

  return 0;
}

for (let i = 0; i < M; i++) {
  const answer = binarySearch(X[i]);
  console.log(answer);
}
