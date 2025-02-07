const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [M, N, K] = input[0].split(" ").map(Number);
const dots = input.slice(1).map((item) => item.split(" ").map(Number));
let paper = Array.from({ length: M }, () => Array(N).fill(0));
const dx = [-1, 0, 0, 1];
const dy = [0, 1, -1, 0];

for (let i = 0; i < K; i++) {
  const [x1, y1, x2, y2] = dots[i];

  for (let y = y1; y < y2; y++) {
    for (let x = x1; x < x2; x++) {
      paper[y][x] = 1;
    }
  }
}

function DFS(startx, starty) {
  let needVisit = [[startx, starty]];
  paper[startx][starty] = 1;
  let count = 1;

  while (needVisit.length) {
    const [x, y] = needVisit.pop();

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx >= 0 && ny >= 0 && nx < M && ny < N && !paper[nx][ny]) {
        count++;
        needVisit.push([nx, ny]);
        paper[nx][ny] = 1;
      }
    }
  }

  return count;
}

let area = 0;
let answer = [];

for (let i = 0; i < M; i++) {
  for (let j = 0; j < N; j++) {
    if (!paper[i][j]) {
      answer.push(DFS(i, j));
      area++;
    }
  }
}

console.log(area);
console.log(answer.sort((a, b) => a - b).join(" "));
