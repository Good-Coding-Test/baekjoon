const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const [r, c, d] = input[1].split(" ").map(Number);
const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];
let room = input.slice(2).map((item) => item.split(" ").map(Number));
let answer = 0;

const needVisit = [[r, c, d]];

while (needVisit.length) {
  const [x, y, v] = needVisit.shift();
  let flag = false;
  if (!room[x][y]) {
    room[x][y] = 2;
    answer++;
  }

  for (let i = 1; i <= 4; i++) {
    const nx = x + dx[(v + 3 * i) % 4];
    const ny = y + dy[(v + 3 * i) % 4];

    if (nx < N && ny < M && !room[nx][ny]) {
      needVisit.push([nx, ny, (v + 3 * i) % 4]);
      flag = true;
      break;
    }
  }

  if (!flag && [0, 2].includes(room[x - dx[v]][y - dy[v]]))
    needVisit.push([x - dx[v], y - dy[v], v]);
}

console.log(answer);
