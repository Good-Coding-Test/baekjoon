const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = parseInt(input[0]);
let queen = Array(N).fill(0);
let answer = 0;

function dfs(row) {
  if (row === N) {
    answer++;
    return;
  }

  for (let i = 0; i < N; i++) {
    if (!isConflit(row, i)) {
      queen[row] = i;
      dfs(row + 1);
      queen[row] = 0;
    }
  }
}

function isConflit(row, column) {
  for (let i = 0; i < row; i++) {
    if (queen[i] === column) return true;

    if (row - i === Math.abs(queen[i] - column)) return true;
  }

  return false;
}

dfs(0);
console.log(answer);
