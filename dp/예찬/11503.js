const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const arr = input[1].split(" ").map(Number);
let dp = Array(arr.length).fill(0);

for (let i = 0; i < arr.length; i++) {
  bfs(i);
}

function bfs(start) {
  let needVisit = [start];

  while (needVisit.length) {
    const n = needVisit.shift();

    for (let i = n + 1; i < arr.length; i++) {
      if (arr[n] < arr[i] && dp[n] + 1 > dp[i]) {
        needVisit.push(i);
        dp[i] = dp[n] + 1;
      }
    }
  }
}

console.log(Math.max(...dp) + 1);
