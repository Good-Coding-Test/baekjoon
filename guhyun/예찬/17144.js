const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M, T] = input[0].split(" ").map(Number);
const room = input.slice(1).map((item) => item.split(" ").map(Number));
let tmp;
let airCleaner = [];

for (let i = 1; i <= N; i++) {
  const row = input[i].split(" ").map(Number);
  room.push(row);
  if (row[0] === -1) airCleaner.push(i - 1);
}

for (let t = 0; t < T; t++) {
  tmp = Array.from({ length: N }, () => Array(M).fill(0));
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (room[i][j] && room[i][j] !== -1) spread(i, j);
    }
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      room[i][j] += tmp[i][j];
    }
  }

  operate();
}

function spread(x, y) {
  const dx = [-1, 0, 0, 1];
  const dy = [0, 1, -1, 0];

  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (nx >= 0 && ny >= 0 && nx < N && ny < M && room[nx][ny] !== -1) {
      tmp[nx][ny] += Math.floor(room[x][y] / 5);
      tmp[x][y] -= Math.floor(room[x][y] / 5);
    }
  }
}

function operate() {
  const [top, bottom] = airCleaner;

  // 위쪽 공기청정기 (반시계)
  for (let r = top - 1; r > 0; r--) room[r][0] = room[r - 1][0];
  for (let c = 0; c < M - 1; c++) room[0][c] = room[0][c + 1];
  for (let r = 0; r < top; r++) room[r][M - 1] = room[r + 1][M - 1];
  for (let c = M - 1; c > 1; c--) room[top][c] = room[top][c - 1];
  room[top][1] = 0;

  // 아래쪽 공기청정기 (시계)
  for (let r = bottom + 1; r < N - 1; r++) room[r][0] = room[r + 1][0];
  for (let c = 0; c < M - 1; c++) room[N - 1][c] = room[N - 1][c + 1];
  for (let r = N - 1; r > bottom; r--) room[r][M - 1] = room[r - 1][M - 1];
  for (let c = M - 1; c > 1; c--) room[bottom][c] = room[bottom][c - 1];
  room[bottom][1] = 0;
}

let answer = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (room[i][j] && room[i][j] !== -1) answer += room[i][j];
  }
}

console.log(answer);
