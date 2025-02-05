const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const dots = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);
const lines = input.slice(2).map((item) => item.split(" ").map(Number));
const answer = [];

for (let i = 0; i < M; i++) {
  let [start, end] = lines[i];

  let left = 0,
    right = dots.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (dots[mid] > end) {
      right = mid;
    } else left = mid + 1;
  }
  const index = left;
  left = 0;
  right = dots.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (dots[mid] < start) left = mid + 1;
    else {
      right = mid;
    }
  }
  const index2 = left;
  answer.push(index - index2);
}

console.log(answer.join("\n"));
