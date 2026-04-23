const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
let map = input.slice(1).map((item) => item.split(" ").map(Number));
const dx = [-1, 0, 0, 1];
const dy = [0, 1, -1, 0];
let answer = 0;

while (1) {
  answer++;
  let tmp = Array.from({ length: N }, () => Array(M).fill(0));
  let flag = false;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (!map[i][j]) continue;
      flag = true;
      let minus = 0;

      for (let d = 0; d < 4; d++) {
        const nx = i + dx[d];
        const ny = j + dy[d];

        if (nx >= 0 && ny >= 0 && nx < N && ny < M && !map[nx][ny]) {
          minus++;
        }
      }

      tmp[i][j] = map[i][j] > minus ? map[i][j] - minus : 0;
    }
  }

  if (!flag) {
    answer = 0;
    break;
  }

  map = tmp;

  let visited = Array.from({ length: N }, () => Array(M).fill(false));
  let count = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (map[i][j] && !visited[i][j]) {
        visited[i][j] = true;
        bfs(i, j);
        count++;
      }
    }
  }

  if (count > 1) break;

  function bfs(x, y) {
    let needVisit = [[x, y]];

    while (needVisit.length) {
      const [cx, cy] = needVisit.shift();

      for (let i = 0; i < 4; i++) {
        const nx = cx + dx[i];
        const ny = cy + dy[i];

        if (
          nx >= 0 &&
          ny >= 0 &&
          nx < N &&
          ny < M &&
          map[nx][ny] &&
          !visited[nx][ny]
        ) {
          visited[nx][ny] = true;
          needVisit.push([nx, ny]);
        }
      }
    }
  }
}

console.log(answer);
