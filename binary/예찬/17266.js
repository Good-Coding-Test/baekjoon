const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = parseInt(input[0]);
const M = parseInt(input[1]);
const light = input[2].split(" ").map(Number);

function binarySearch() {
  let start = 0;
  let end = N;
  let result = N;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    let lastIndex = -1;
    let isFailed = false;

    for (let i = 0; i < M; i++) {
      const left = Math.max(light[i] - mid, 0);
      const right = Math.min(light[i] + mid - 1, N - 1);

      if (left > lastIndex + 1) {
        isFailed = true;
        break;
      }
      lastIndex = right;
    }
    if (lastIndex < N - 1) {
      isFailed = true;
    }
    if (!isFailed) {
      result = mid;
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return result;
}

console.log(binarySearch());
