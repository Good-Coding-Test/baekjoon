let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const T = +input[0];
input = input.slice(1);
const dx = [0, 0, 1, -1];
const dy = [-1, 1, 0, 0];

for (let i = 0; i < T; i++) {
  const N = +input[0];
  const map = input.slice(1).map((item) => item.split(" ").map(Number));
  let dp = Array.from({ length: 2 }, () => Array(N).fill(0));

  dp[0][0] = map[0][0];
  dp[1][0] = map[1][0];

  dp[0][1] = dp[1][0] + map[0][1];
  dp[1][1] = dp[0][0] + map[1][1];

  for (let j = 2; j < N; j++) {
    dp[0][j] = Math.max(dp[1][j - 1], dp[1][j - 2]) + map[0][j];
    dp[1][j] = Math.max(dp[0][j - 1], dp[0][j - 2]) + map[1][j];
  }

  console.log(Math.max(dp[0][N - 1], dp[1][N - 1]));
  input = input.slice(3);
}
