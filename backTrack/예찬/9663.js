const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const N = parseInt(input);
let chess = [];
let number = 0;

function DFS(row) {
  if (row === N) {
    number++;
    return;
  }

  for (let i = 0; i < N; i++) {
    chess[row] = i;
    if (!hasConflict(row)) {
      DFS(row + 1);
    }
  }
}

function hasConflict(row) {
  for (let i = 0; i < row; i++) {
    if (chess[i] === chess[row]) return true;
    // 같은 대각선 안에 있다는 것은 행의 차이와 열의 차이가 같다는 것이므로
    if (Math.abs(chess[row] - chess[i]) === row - i) return true;
  }
  return false;
}

DFS(0);
console.log(number);
