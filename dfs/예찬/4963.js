const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const dx = [-1, 0, 0, 1, -1, 1, -1, 1];
const dy = [0, 1, -1, 0, 1, 1, -1, -1];
let test = 0;
let [w, h] = input[test].split(" ").map(Number);
let map = input.slice(1, 1 + h).map((item) => item.split(" ").map(Number));
let answer = [];

while (w !== 0 && h !== 0) {
  let tmpMap = map.map((item) => [...item]);
  let count = 0;

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      count += DFS(i, j, tmpMap);
    }
  }
  answer.push(count);

  test += 1 + h;
  [w, h] = input[test].split(" ").map(Number);
  map = input
    .slice(test + 1, test + 1 + h)
    .map((item) => item.split(" ").map(Number));
}

function DFS(x, y, tmpMap) {
  if (tmpMap[x][y] === 0 || tmpMap[x][y] === true) return 0;
  let needVisit = [];
  tmpMap[x][y] = true;
  needVisit.push([x, y]);

  while (needVisit.length) {
    const [x, y] = needVisit.pop();

    for (let i = 0; i < 8; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx >= 0 && ny >= 0 && nx < h && ny < w && tmpMap[nx][ny] === 1) {
        needVisit.push([nx, ny]);
        tmpMap[nx][ny] = true;
      }
    }
  }
  return 1;
}

console.log(answer.join("\n"));
