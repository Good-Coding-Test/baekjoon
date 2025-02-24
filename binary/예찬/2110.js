const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, C] = input[0].split(" ").map(Number);
const homes = input
  .slice(1)
  .map(Number)
  .sort((a, b) => a - b);

function binarySearch() {
  let start = 1;
  let end = homes[N - 1] - homes[0];
  let result = 0;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    let count = 1;
    let last = homes[0];

    for (let i = 1; i < N; i++) {
      if (homes[i] - last >= mid) {
        count++;
        last = homes[i];
      }
    }

    if (count >= C) {
      start = mid + 1;
      result = mid;
    } else end = mid - 1;
  }
  return result;
}

console.log(binarySearch());
