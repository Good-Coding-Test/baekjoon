const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = parseInt(input[0]);
const M = parseInt(input[2]);

const Sanggeun = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);
const X = input[3].split(" ").map(Number);

function binarySearch(target) {
  let start = 0;
  let end = N;

  while (start < end) {
    const mid = Math.floor((start + end) / 2);

    if (Sanggeun[mid] <= target) start = mid + 1;
    else end = mid;
  }

  let start2 = 0;
  let end2 = N;

  while (start2 < end2) {
    const mid2 = Math.floor((start2 + end2) / 2);

    if (Sanggeun[mid2] < target) start2 = mid2 + 1;
    else end2 = mid2;
  }

  return start - start2;
}

for (let i = 0; i < M; i++) {
  binarySearch(X[i]);
}

const results = [];
for (let i = 0; i < M; i++) {
  results.push(binarySearch(X[i]));
}
console.log(results.join("\n"));
