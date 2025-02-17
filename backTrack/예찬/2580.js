const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

let sdoku = input.map((item) => item.split(" ").map(Number));

function findEmpty() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (!sdoku[i][j]) return [i, j];
    }
  }
  return null;
}

function backTrack() {
  const empty = findEmpty();
  if (!empty) return false;
  const [x, y] = empty;

  for (let i = 1; i <= 9; i++) {
    if (!isConflict9(i, x, y) && !isConflitX(i, x) && !isConflitY(i, y)) {
      sdoku[x][y] = i;
      if (!backTrack()) return;
      sdoku[x][y] = 0;
    }
  }
  return true;
}

function isConflitX(target, row) {
  for (let i = 0; i < 9; i++) {
    if (sdoku[row][i] === target) return true;
  }
  return false;
}

function isConflitY(target, column) {
  for (let i = 0; i < 9; i++) {
    if (sdoku[i][column] === target) return true;
  }
  return false;
}

function isConflict9(target, x, y) {
  let i, j;
  if (x < 3) i = 0;
  else if (x < 6) i = 3;
  else i = 6;

  if (y < 3) j = 0;
  else if (y < 6) j = 3;
  else j = 6;

  for (let a = i; a < i + 3; a++) {
    for (let b = j; b < j + 3; b++) {
      if (sdoku[a][b] === target) return true;
    }
  }
  return false;
}
backTrack();
console.log(sdoku.map((item) => item.join(" ")).join("\n"));
