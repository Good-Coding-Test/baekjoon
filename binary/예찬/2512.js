const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const costs = input[1].split(" ").map(Number);
const budget = +input[2];

function binarySearch() {
  let start = 0;
  let end = Math.max(...costs);
  let max = 0;
  let result = 0;

  if (
    costs.reduce((previous, current) => {
      previous += current;
    }) <= budget
  )
    return end;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    let sum = 0;

    for (let i = 0; i < costs.length; i++) {
      const rest = costs[i] > mid ? mid : costs[i];
      sum += rest;
    }

    if (sum <= budget) {
      max = Math.max(max, sum);

      start = mid + 1;
      result = mid;
    } else end = mid - 1;
  }

  return result;
}

console.log(binarySearch());
