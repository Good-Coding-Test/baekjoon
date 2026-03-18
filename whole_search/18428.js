const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const map = input.slice(1).map((item) => item.split(" "));

const empties = [];
const teachers = [];

// 빈 공간, 선생님 위치 추출
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (map[i][j] === "X") empties.push([i, j]);
    if (map[i][j] === "T") teachers.push([i, j]);
  }
}

// 빈 공간에 3개의 장애물 들어가는 모든 조합
function makeCombi() {
  let result = [];
  let visited = Array(empties.length).fill(false);

  function dfs(start, arr) {
    if (arr.length === 3) {
      result.push([...arr]);
      return;
    }
    for (let i = start; i < empties.length; i++) {
      if (visited[i]) continue;

      arr.push(empties[i]);
      visited[i] = true;

      dfs(i + 1, arr);

      visited[i] = false;
      arr.pop();
    }
  }

  dfs(0, []);
  return result;
}

// 조합 중에 YES가 되는 경우 탐색
for (let com of makeCombi()) {
  let c = [];
  for (let [x, y] of com) {
    c.push(`${x},${y}`);
  }
  if (isSafe(c)) {
    console.log("YES");
    return;
  }
}

console.log("NO");

// 동서남북을 탐색하고, 중간에 장애물 나오면 그 뒤는 더 이상 보지 못하도록 탐색 종료
function isSafe(c) {
  for (let [x, y] of teachers) {
    for (let i = x + 1; i < N; i++) {
      if (c.includes(`${i},${y}`)) break;
      if (map[i][y] === "S") {
        return false;
      }
    }
    for (let i = x - 1; i >= 0; i--) {
      if (c.includes(`${i},${y}`)) break;
      if (map[i][y] === "S") {
        return false;
      }
    }
    for (let i = y + 1; i < N; i++) {
      if (c.includes(`${x},${i}`)) break;
      if (map[x][i] === "S") {
        return false;
      }
    }
    for (let i = y - 1; i >= 0; i--) {
      if (c.includes(`${x},${i}`)) break;
      if (map[x][i] === "S") {
        return false;
      }
    }
  }

  return true;
}
