const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const N = +input;

function isGood(str) {
  const len = str.length;
  for (let i = 1; i <= 2 * len; i++) {
    if (str.slice(-i) === str.slice(-2 * i, -i)) return false;
  }

  return true;
}

function dfs(str) {
  if (str.length === N) {
    console.log(str);
    process.exit(0);
  }

  for (let i = 1; i <= 3; i++) {
    if (isGood(str + i)) dfs(str + i);
  }
}

dfs("");
