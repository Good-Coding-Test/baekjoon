const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, L, R] = input[0].split(" ").map(Number);
const map = input.slice(1).map((item) => item.split(" ").map(Number));
const dx = [-1, 0, 0, 1];
const dy = [0, 1, -1, 0];

for (let answer = 0; answer <= 2000; answer++) {
  let flag = true; // 반복 종료 플래그
  const set = new Set(); //
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      for (let d = 0; d < 4; d++) {
        const nx = i + dx[d];
        const ny = j + dy[d];

        if (
          nx >= 0 &&
          ny >= 0 &&
          nx < N &&
          ny < N &&
          Math.abs(map[nx][ny] - map[i][j]) >= L &&
          Math.abs(map[nx][ny] - map[i][j]) <= R
        ) {
          set.add(`${i},${j}->${nx},${ny}`);
          flag = false;
        }
      }
    }
  }

  if (flag) {
    console.log(answer);
    break;
  }

  let visited = Array.from({ length: N }, () => Array(N).fill(false));
  let union = []; // 각 연합을 저장할 배열

  // 각 연합국 탐색
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!visited[i][j]) {
        const [people, path] = dfs(i, j, 0, []);
        union.push([people, path]);
      }
    }
  }

  // 각 연합국의 평균을 저장
  for (let [people, path] of union) {
    for (let [x, y] of path) {
      map[x][y] = Math.floor(people / path.length);
    }
  }

  function dfs(i, j, people, path) {
    visited[i][j] = true;
    people = map[i][j];
    path.push([i, j]);
    for (let d = 0; d < 4; d++) {
      const nx = i + dx[d];
      const ny = j + dy[d];

      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < N &&
        ny < N &&
        !visited[nx][ny] &&
        set.has(`${i},${j}->${nx},${ny}`)
      ) {
        const [p] = dfs(nx, ny, people, path);
        people += p;
      }
    }
    return [people, path];
  }
}
