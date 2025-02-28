const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = parseInt(input[0]);

function dfs(depth, arr) {
  if (depth === N) {
    console.log(arr);

    return;
  }

  for (let i = 0; i < 10; i++) {
    let number = arr * 10 + i;

    if (isPrime(number)) dfs(depth + 1, number);
  }
}

function isPrime(n) {
  if (n < 2) return false;

  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

for (let i of [2, 3, 5, 7]) {
  dfs(1, i);
}
