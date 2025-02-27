const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = parseInt(input[0]);
let map = input.slice(1).map((item) => item.split(" ").map(Number));
let eatCount = 0;
const dx = [-1, 0, 0, 1];
const dy = [0, 1, -1, 0];
let shark = 2;
let count = 0;
let startX, startY;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (map[i][j] === 9) {
      startX = i;
      startY = j;
      map[i][j] = 0;
    }
  }
}

function bfs(x, y) {
  let queue = [[x, y, 0]];
  let visited = Array.from({ length: N }, () => Array(N).fill(false));
  visited[x][y] = true;

  let feeds = [];
  let minDist = Infinity;

  while (queue.length) {
    let [cx, cy, dist] = queue.shift();

    if (dist > minDist) break;

    for (let i = 0; i < 4; i++) {
      let nx = cx + dx[i];
      let ny = cy + dy[i];

      if (nx >= 0 && ny >= 0 && nx < N && ny < N && !visited[nx][ny]) {
        if (map[nx][ny] <= shark) {
          visited[nx][ny] = true;
          queue.push([nx, ny, dist + 1]);

          if (map[nx][ny] > 0 && map[nx][ny] < shark) {
            feeds.push([nx, ny, dist + 1]);
            minDist = dist + 1;
          }
        }
      }
    }
  }

  if (feeds.length) {
    feeds.sort((a, b) => {
      if (a[2] !== b[2]) return a[2] - b[2]; // 거리 기준 오름차순
      if (a[0] !== b[0]) return a[0] - b[0]; // x 좌표(위쪽) 기준 오름차순
      return a[1] - b[1]; // y 좌표(왼쪽) 기준 오름차순
    });
    return feeds[0];
  }
  return null;
}

while (true) {
  let feed = bfs(startX, startY);
  if (!feed) break;

  let [fx, fy, dist] = feed;
  count += dist;
  map[fx][fy] = 0;
  startX = fx;
  startY = fy;
  eatCount++;

  if (eatCount === shark) {
    shark++;
    eatCount = 0;
  }
}
console.log(count);
