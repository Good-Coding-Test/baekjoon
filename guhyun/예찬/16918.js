const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [R, C, N] = input[0].split(" ").map(Number);
let map = input.slice(1).map((item) => item.split(""));
let time = Array.from({ length: R }, () => Array(C).fill(0));
const dx = [-1, 0, 0, 1];
const dy = [0, 1, -1, 0];

for (let i = 0; i < R; i++) {
  for (let j = 0; j < C; j++) {
    if (map[i][j] === "O") time[i][j] = 2;
  }
}

for (let t = 2; t <= N; t++) {
  let boom = new Set();
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      time[i][j] && time[i][j]--;
    }
  }
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (t % 2 === 0) {
        // 빈 곳 채우기
        if (map[i][j] === ".") {
          map[i][j] = "O";
          time[i][j] = 3;
        }
      } else {
        // 터뜨릴 곳 마킹(동시에 터뜨리기 위해)
        if (map[i][j] === "O" && !time[i][j]) {
          boom.add(`${i},${j}`);

          for (let r = 0; r < 4; r++) {
            let nx = i + dx[r];
            let ny = j + dy[r];

            if (nx >= 0 && ny >= 0 && nx < R && ny < C) {
              boom.add(`${nx},${ny}`);
            }
          }
        }
      }
    }
  }

  // 한 번에 터뜨리기
  for (let b of boom) {
    const [x, y] = b.split(",");
    map[x][y] = ".";
    time[x][y] = 0;
  }
}

console.log(map.map((item) => item.join("")).join("\n"));
