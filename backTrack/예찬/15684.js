const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M, H] = input[0].split(" ").map(Number);
let horizons = Array.from({ length: H + 1 }, () => Array(N + 1).fill(false));
for (let i = 1; i <= M; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  horizons[a][b] = true;
}
let answer = Infinity;

function check() {
  for (let i = 1; i <= N; i++) {
    let pos = i;

    for (let j = 1; j <= H; j++) {
      if (horizons[j][pos]) pos++;
      else if (pos > 1 && horizons[j][pos - 1]) pos--;
    }
    if (i !== pos) return false;
  }
  return true;
}

function dfs(count, x, y) {
  if (count > 3) return;

  if (check()) {
    answer = Math.min(answer, count);
    return;
  }

  for (let i = x; i <= H; i++) {
    for (let j = x === i ? y : 1; j <= N; j++) {
      if (!horizons[i][j] && !horizons[i][j - 1] && !horizons[i][j + 1]) {
        horizons[i][j] = true;
        dfs(count + 1, i, j + 2);
        horizons[i][j] = false;
      }
    }
  }
}

dfs(0, 1, 1);
console.log(answer === Infinity ? -1 : answer);
