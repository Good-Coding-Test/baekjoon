const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);
const water = input.slice(1).map(Number);

function binarySearch() {
  let start = 1;
  let end = Math.max(...water);
  let result = 0;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    let people = 0;

    for (let i = 0; i < N; i++) {
      let r = water[i];
      while (r >= mid) {
        r -= mid;
        people++;
      }
    }

    if (people >= K) {
      start = mid + 1;
      result = mid;
    } else end = mid - 1;
  }
  return result;
}

console.log(binarySearch());
