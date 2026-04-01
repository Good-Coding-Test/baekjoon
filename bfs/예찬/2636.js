const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
let map = input.slice(1).map((item) => item.split(" ").map(Number));
let outline = Array.from({ length: N }, () => Array(M).fill(false));
const dx = [-1, 0, 0, 1];
const dy = [0, 1, -1, 0];
let answer = 0;
let time = 0;

while (1) {
  let count = 0;
  flag = false;
  let visited = Array.from({ length: N }, () => Array(M).fill(false));
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (!visited[i][j] && (!i || !j || i === N - 1 || j === M - 1)) {
        visited[i][j] = true;
        bfs(i, j, visited);
      }
    }
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (!outline[i][j]) continue;
      for (let d = 0; d < 4; d++) {
        const nx = i + dx[d];
        const ny = j + dy[d];

        if (nx >= 0 && ny >= 0 && nx < N && ny < M && map[nx][ny] === 1) {
          map[nx][ny] = 0;
          count++;
          flag = true;
        }
      }
    }
  }

  if (!flag) break;
  answer = count;
  time++;
}

console.log(time);
console.log(answer);

function bfs(x, y, visited) {
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
        !visited[nx][ny] &&
        !map[nx][ny]
      ) {
        visited[nx][ny] = true;
        outline[nx][ny] = true;
        needVisit.push([nx, ny]);
      }
    }
  }
}
