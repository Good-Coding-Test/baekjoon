const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = parseInt(input[0]);
const board = input.slice(1).map((item) => item.split(""));
const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];
let max = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    for (let k = 0; k < 4; k++) {
      let map = board.map((row) => [...row]);
      const nx = i + dx[k];
      const ny = j + dy[k];

      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < N &&
        ny < N &&
        board[i][j] !== board[nx][ny]
      ) {
        const tmp = map[i][j];
        map[i][j] = map[nx][ny];
        map[nx][ny] = tmp;
        max = Math.max(max, DFS(map));
      }
    }
  }
}

console.log(max);

function DFS(map) {
  let answer = [];
  for (let a = 0; a < N * 2; a++) {
    let cnt = Array.from({ length: N }).fill(1);
    for (let b = 1; b < N; b++) {
      if (a < N) {
        if (map[a][b - 1] === map[a][b]) cnt[b] = cnt[b - 1] + 1;
        else cnt[b] = 1;
      } else {
        if (map[b - 1][a - N] === map[b][a - N]) cnt[b] = cnt[b - 1] + 1;
        else cnt[b] = 1;
      }
    }
    answer.push(Math.max(...cnt));
  }
  return Math.max(...answer);
}
