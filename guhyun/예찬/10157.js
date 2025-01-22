const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const K = parseInt(input[1]);
let hall = Array.from({ length: M }, () =>
  Array.from({ length: N }, () => false)
);
let x = M - 1,
  y = 0;
const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];
let index = 0;
let count = 0;

if (K > N * M) {
  console.log(0);
  return;
}

for (let i = 0; i < N * M; i++) {
  if (i + 1 === K) {
    console.log(y + 1, M - x);
    return;
  }

  hall[x][y] = true;

  if (
    x + dx[index] < 0 ||
    y + dy[index] < 0 ||
    x + dx[index] >= M ||
    y + dy[index] >= N ||
    hall[x + dx[index]][y + dy[index]] === true
  ) {
    index = (index + 1) % 4;
  }
  x += dx[index];
  y += dy[index];
  count++;
}
