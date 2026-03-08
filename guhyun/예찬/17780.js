const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);
const board = input.slice(1, N + 1).map((item) => item.split(" ").map(Number));
let chesses = input.slice(N + 1).map((item) => {
  const [x, y, d] = item.split(" ").map(Number);
  return [x - 1, y - 1, d - 1];
});
let currentChesses = Array.from({ length: N }, () =>
  Array.from({ length: N }, () => []),
);
const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];

for (let i = 0; i < K; i++) {
  const [x, y] = chesses[i];
  currentChesses[x][y].push(i);
}

for (let turn = 1; turn <= 1000; turn++) {
  for (let i = 0; i < K; i++) {
    let [x, y, d] = chesses[i];

    const idx = currentChesses[x][y].indexOf(i);
    const moving = currentChesses[x][y];
    if (idx !== 0) continue;

    let nx = x + dx[d];
    let ny = y + dy[d];

    if (nx < 0 || ny < 0 || nx >= N || ny >= N || board[nx][ny] === 2) {
      const reverse = [1, 0, 3, 2];
      d = reverse[d];
      chesses[i][2] = d;

      nx = x + dx[d];
      ny = y + dy[d];

      if (nx < 0 || ny < 0 || nx >= N || ny >= N || board[nx][ny] === 2) {
        currentChesses[x][y].push(...moving);
        continue;
      }
    }

    if (board[nx][ny] === 1) {
      moving.reverse();
    }

    for (const m of moving) {
      chesses[m][0] = nx;
      chesses[m][1] = ny;
    }

    currentChesses[nx][ny].push(...moving);

    if (currentChesses[nx][ny].length >= 4) {
      console.log(turn);
      return;
    }
  }
}

console.log(-1);
