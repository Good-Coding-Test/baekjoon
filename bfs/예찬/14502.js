const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
let map = input.slice(1).map((item) => item.split(" ").map(Number));
let maxSafeArea = 0;
const dx = [-1, 0, 0, 1];
const dy = [0, 1, -1, 0];

function backTrack(count) {
  if (count === 3) {
    maxSafeArea = Math.max(maxSafeArea, BFS());
    return;
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (map[i][j] === 0) {
        map[i][j] = 1;
        backTrack(count + 1);
        map[i][j] = 0;
      }
    }
  }
}

function BFS() {
  let count = 0;
  const visited = map.map((value) => [...value]);

  const tmpneedVisit = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (visited[i][j] === 2) tmpneedVisit.push([i, j]);
    }
  }

  while (tmpneedVisit.length) {
    const [x, y] = tmpneedVisit.shift();

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx >= 0 && ny >= 0 && nx < N && ny < M && visited[nx][ny] === 0) {
        tmpneedVisit.push([nx, ny]);
        visited[nx][ny] = 2;
      }
    }
  }
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (visited[i][j] === 0) count++;
    }
  }
  return count;
}

backTrack(0);
console.log(maxSafeArea);
