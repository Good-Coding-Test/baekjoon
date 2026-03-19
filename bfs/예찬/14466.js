const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, K, R] = input[0].split(" ").map(Number);
const roads = input.slice(1, 1 + R);
const cows = input.slice(R + 1, R + 1 + K);
let answer = 0;

const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];

// 길과 소를 늘려서 표시(길은 선의 형태이므로 면으로 전환하기 위해)
for (let cow of cows) {
  let map = Array.from({ length: 2 * N - 1 }, () => Array(2 * N - 1).fill(0));

  // 길 표시
  for (let road of roads) {
    const [r1, c1, r2, c2] = road.split(" ").map(Number);
    map[2 * ((r1 + r2) / 2 - 1)][2 * ((c1 + c2) / 2 - 1)] = 1;
  }

  // 소 표시
  for (let c of cows) {
    const [r, col] = c.split(" ").map(Number);
    map[2 * (r - 1)][2 * (col - 1)] = 2;
  }

  const [r, c] = cow.split(" ").map(Number);
  answer += dfs(map, 2 * (r - 1), 2 * (c - 1));
}

function dfs(tmpMap, x, y) {
  let stack = [[x, y]];
  let find = 0;

  tmpMap[x][y] = 3;

  while (stack.length) {
    const [curX, curY] = stack.pop();

    for (let i = 0; i < 4; i++) {
      // 기존 맵에 선을 면으로 추가했으므로 기본 이동은 두칸씩
      const nx = curX + dx[i] * 2;
      const ny = curY + dy[i] * 2;

      // 벽 체크는 한칸씩(이게 목적)
      const wallX = curX + dx[i];
      const wallY = curY + dy[i];

      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < 2 * N - 1 &&
        ny < 2 * N - 1 &&
        tmpMap[wallX][wallY] !== 1 &&
        tmpMap[nx][ny] !== 3
      ) {
        // 소 찾으면 find + 1
        if (tmpMap[nx][ny] === 2) find++;

        tmpMap[nx][ny] = 3;
        stack.push([nx, ny]);
      }
    }
  }

  // 소가 찾을 수 있는 모든 경우에서 찾은 경우를 뺀다(찾을 수 없었던 경우의 수를 구하기 위해).
  return K - 1 - find;
}

// answer은 쌍을 구하는 것이므로 중복된 경우는 제거한다.
console.log(answer / 2);
