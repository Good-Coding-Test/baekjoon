const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

let [N, M, x, y, K] = input[0].split(" ").map(Number);
const map = input.slice(1, 1 + N).map((item) => item.split(" ").map(Number));
const cmd = input[N + 1].split(" ").map(Number);
const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];

// [동, 서, 북, 남, 바닥, 위]
let dice = [0, 0, 0, 0, 0, 0];

for (let d of cmd) {
  const nx = x + dx[d - 1];
  const ny = y + dy[d - 1];
  if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
  x = nx;
  y = ny;

  let [e, w, n, s, bot, top] = dice;

  if (d === 1) {
    dice = [bot, top, n, s, w, e];
  } else if (d === 2) {
    dice = [top, bot, n, s, e, w];
  } else if (d === 3) {
    dice = [e, w, bot, top, s, n];
  } else if (d === 4) {
    dice = [e, w, top, bot, n, s];
  }

  if (map[x][y] === 0) map[x][y] = dice[4];
  else {
    dice[4] = map[x][y];
    map[x][y] = 0;
  }

  console.log(dice[5]); // 위 출력
}
