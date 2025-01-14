const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = parseInt(input[0]);
const picture = input.slice(1).map((item) => item.split(""));
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];
let area = 0;
let area2 = 0;

let tmpPic1 = Array.from({ length: N }, () => Array(N).fill(false));
let tmpPic2 = Array.from({ length: N }, () => Array(N).fill(false));

function BFS(start, type) {
  let tmpPic = type ? tmpPic2 : tmpPic1;
  const needVisit = [];
  needVisit.push(start);
  const [x, y] = start;
  if (tmpPic[x][y]) return 0;
  let currentColor = picture[x][y];

  while (needVisit.length) {
    const [x, y] = needVisit.shift();

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];
      const condition = !type
        ? nx >= 0 &&
          ny >= 0 &&
          nx < N &&
          ny < N &&
          picture[nx][ny] === currentColor &&
          !tmpPic[nx][ny]
        : nx >= 0 &&
          ny >= 0 &&
          nx < N &&
          ny < N &&
          (currentColor === "R" || currentColor === "G"
            ? picture[nx][ny] === "R" || picture[nx][ny] === "G"
            : picture[nx][ny] === currentColor) &&
          !tmpPic[nx][ny];

      if (condition) {
        needVisit.push([nx, ny]);
        tmpPic[nx][ny] = true;
      }
    }
  }
  return 1;
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    area += BFS([i, j], false);
    area2 += BFS([i, j], true);
  }
}

console.log(area, area2);
