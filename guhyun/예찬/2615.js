const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const map = input.map((item) => item.split(" ").map(Number));
let answer = false;

for (let i = 0; i < 19; i++) {
  for (let j = 0; j < 19; j++) {
    if (map[i][j]) {
      const [color, gx, gy] = check(i, j);
      if (color) {
        console.log(color);
        console.log(gx + 1, gy + 1);
        answer = true;

        return;
      }
    }
  }
}
if (!answer) console.log(0);

function check(x, y) {
  const color = map[x][y];

  let count = 0;
  let nx = x;
  let ny = y;
  let gx = nx;
  let gy = ny;

  while (nx - 1 >= 0 && map[nx - 1][ny] === color) {
    nx--;
    count++;
  }

  gx = nx;
  gy = ny;
  ny = y;
  nx = x;
  while (nx + 1 < 19 && map[nx + 1][ny] === color) {
    nx++;
    count++;
  }
  if (count === 4) return [color, gx, gy];

  count = 0;
  ny = y;
  nx = x;
  while (ny - 1 >= 0 && map[nx][ny - 1] === color) {
    ny--;
    count++;
  }
  gx = nx;
  gy = ny;
  ny = y;
  nx = x;
  while (ny + 1 < 19 && map[nx][ny + 1] === color) {
    ny++;
    count++;
  }
  if (count === 4) return [color, gx, gy];
  count = 0;
  ny = y;
  nx = x;
  while (ny - 1 >= 0 && nx - 1 >= 0 && map[nx - 1][ny - 1] === color) {
    ny--;
    nx--;
    count++;
  }

  gx = nx;
  gy = ny;
  ny = y;
  nx = x;
  while (nx + 1 < 19 && ny + 1 < 19 && map[nx + 1][ny + 1] === color) {
    nx++;
    ny++;
    count++;
  }
  if (count === 4) return [color, gx, gy];
  count = 0;
  ny = y;
  nx = x;
  while (ny + 1 < 19 && nx - 1 >= 0 && map[nx - 1][ny + 1] === color) {
    nx--;
    ny++;
    count++;
  }

  ny = y;
  nx = x;
  while (nx + 1 < 19 && ny - 1 >= 0 && map[nx + 1][ny - 1] === color) {
    ny--;
    nx++;
    count++;
  }
  gx = nx;
  gy = ny;

  if (count === 4) return [color, gx, gy];
  return [0, 0, 0];
}
