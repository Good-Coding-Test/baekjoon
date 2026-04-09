const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, W, L] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);
let sum = 0;
let idx = 0;
let queue = Array(W).fill(0);
let answer = 0;

while (1) {
  answer++;
  sum -= queue.shift();
  if (sum + arr[idx] <= L) {
    queue.push(arr[idx++]);
    sum += queue[queue.length - 1];
  } else queue.push(0);

  if (queue.every((item) => item === 0)) break;
}

console.log(answer);
