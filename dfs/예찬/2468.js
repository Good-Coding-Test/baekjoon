const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = parseInt(input[0]);
const map = input.slice(1).map((item) => item.split(" ").map(Number));
const dx = [-1, 0, 0, 1];
const dy = [0, 1, -1, 0];

function DFS(map, x, y) {
  if (map[x][y] === true) {
    return 0;
  }
  let needVisit = [[x, y]];
  map[x][y] = true;

  while (needVisit.length) {
    const [x, y] = needVisit.pop();

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx >= 0 && ny >= 0 && nx < N && ny < N && map[nx][ny] !== true) {
        needVisit.push([nx, ny]);
        map[nx][ny] = true;
      }
    }
  }
  return 1;
}

const maxHigh = Math.max(...map.flat());
let answer = 0;

for (let h = 0; h < maxHigh; h++) {
  let count = 0;
  let tmpMap = map.map((item) => [...item]);

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (map[i][j] <= h) tmpMap[i][j] = true;
    }
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      count += DFS(tmpMap, i, j);
    }
  }

  answer = Math.max(answer, count);
}

console.log(answer);
