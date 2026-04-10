const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const arr = input[1].split(" ").map(Number);
let dp = Array(N).fill(0);
dp[0] = arr[0];

for (let i = 1; i < N; i++) {
  dp[i] = dp[i - 1] > 0 ? dp[i - 1] + arr[i] : arr[i];
}

console.log(Math.max(...dp));
