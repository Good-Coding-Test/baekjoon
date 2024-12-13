const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const N = parseInt(input);
let tried = new Array(N + 1).fill(Infinity);

function DP(n, count) {
  if (tried[n] <= count) return;

  tried[n] = count;

  if (n === 1) return;

  if (n % 3 === 0) DP(n / 3, count + 1);
  if (n % 2 === 0) DP(n / 2, count + 1);
  DP(n - 1, count + 1);
}

DP(N, 0);
console.log(tried[1]);
