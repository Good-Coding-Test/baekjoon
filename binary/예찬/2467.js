const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = parseInt(input[0]);
const fluids = input[1].split(" ").map(Number);

function binarySearch() {
  let start = 0;
  let end = N - 1;
  let min = Infinity;
  let left = start;
  let right = end;

  while (start < end) {
    if (Math.abs(fluids[end] + fluids[start]) < min) {
      min = Math.abs(fluids[end] + fluids[start]);
      left = start;
      right = end;
    }
    if (fluids[start] + fluids[end] > 0) {
      end--;
    } else start++;
  }
  return [fluids[left], fluids[right]];
}

console.log(binarySearch().join(" "));
