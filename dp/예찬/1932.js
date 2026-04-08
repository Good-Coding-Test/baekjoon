const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const triangle = input.slice(1).map((item) => item.split(" ").map(Number));
const M = 2 * N - 1;
let newTri = Array.from({ length: N }, () => Array(M).fill(-1));
let dp = Array.from({ length: N }, () => Array(M).fill(0));
let start = 0;

for (let i = N - 1; i >= 0; i--) {
  let idx = 0;
  for (let j = 0; j < M; j++) {
    if ((j + start) % 2 === 0 && start <= j) {
      dp[i][j] = triangle[i][idx];
      newTri[i][j] = triangle[i][idx];
      idx++;
    }
    if (triangle[i].length <= idx) break;
  }
  start++;
}

for (let i = 0; i < N - 1; i++) {
  for (let j = 0; j < M; j++) {
    if (newTri[i][j] !== -1) {
      if (i === 0) dp[i][j] = newTri[i][j];

      if (
        j - 1 >= 0 &&
        newTri[i + 1][j - 1] !== -1 &&
        dp[i][j] + newTri[i + 1][j - 1] > dp[i + 1][j - 1]
      ) {
        dp[i + 1][j - 1] = dp[i][j] + newTri[i + 1][j - 1];
      }
      if (
        j + 1 < M &&
        newTri[i + 1][j + 1] !== -1 &&
        dp[i][j] + newTri[i + 1][j + 1] > dp[i + 1][j + 1]
      ) {
        dp[i + 1][j + 1] = dp[i][j] + newTri[i + 1][j + 1];
      }
    }
  }
}

console.log(Math.max(...dp[N - 1]));
