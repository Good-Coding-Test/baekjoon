const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const map = input.slice(1).map((item) => item.split(""));
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];
let tmpMap = map.map((item) => [...item]);

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (map[i][j] === ".") continue;
    let count = 0;
    for (let k = 0; k < 4; k++) {
      const nx = i + dx[k];
      const ny = j + dy[k];

      if (nx < 0 || ny < 0 || nx >= N || ny >= M || map[nx][ny] === ".") {
        count++;
      }
    }
    if (count >= 3) tmpMap[i][j] = ".";
  }
}

let x = Infinity,
  y = Infinity,
  x2 = 0,
  y2 = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (tmpMap[i][j] === "X") {
      if (x > i) x = i;
      if (x2 < i) x2 = i;
      if (y > j) y = j;
      if (y2 < j) y2 = j;
    }
  }
}

let answer = "";

for (let i = x; i <= x2; i++) {
  for (let j = y; j <= y2; j++) {
    answer += tmpMap[i][j];
  }
  answer += "\n";
}
console.log(answer);
