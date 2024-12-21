const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const trees = input[1].split(" ").map(Number);

function binarySearch() {
  let start = 0;
  let end = Math.max(...trees);
  let result = 0;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    let tree = 0;

    for (let i = 0; i < N; i++) {
      if (mid < trees[i]) tree += trees[i] - mid;
    }

    if (tree >= M) {
      start = mid + 1;
      result = mid;
    } else end = mid - 1;
  }

  return result;
}

console.log(binarySearch());
