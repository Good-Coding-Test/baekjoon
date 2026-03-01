const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [M, N] = input[0].split(" ").map(Number);
let board = input.slice(1).map((item) => item.split(""));
let answer = Infinity;

for (let i = 0; i <= M - 8; i++) {
  for (let j = 0; j <= N - 8; j++) {
    const tmpMap = board.map((item) => item.slice(j, j + 8)).slice(i, i + 8);

    answer = Math.min(answer, counting(tmpMap));
  }
}

function counting(map) {
  let count = [0, 0];

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const wFirst = (i + j) % 2 === 0 ? "W" : "B";
      const bFirst = (i + j) % 2 === 0 ? "B" : "W";

      if (map[i][j] !== wFirst) count[0]++;
      if (map[i][j] !== bFirst) count[1]++;
    }
  }

  return Math.min(...count);
}

console.log(answer);
