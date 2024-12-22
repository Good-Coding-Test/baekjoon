const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [K, N] = input[0].split(" ").map(Number);
const lines = input.slice(1).map(Number);

function binarySearch() {
  let start = 0;
  let end = Math.max(...lines);
  let result = 0;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    let line = 0;

    for (let i = 0; i < K; i++) {
      line += Math.floor(lines[i] / mid);
    }

    if (line >= N) {
      start = mid + 1;
      result = mid;
    } else end = mid - 1;
  }

  return result;
}

console.log(binarySearch());
