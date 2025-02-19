const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const area = input.slice(1).map((item) => item.split(" ").map(Number));
const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];
let answer = Infinity;

DFS(area);
console.log(answer);

function DFS(map) {
  const cctv = findCCTV(map);

  if (!cctv) {
    answer = Math.min(answer, findsagag(map));
    return;
  }
  const [i, j] = cctv;

  for (let dir = 0; dir < 4; dir++) {
    const tmpMap = monitor(i, j, map, dir);
    DFS(tmpMap);
  }
}

function findCCTV(map) {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if ([1, 2, 3, 4, 5].includes(map[i][j])) {
        return [i, j];
      }
    }
  }
  return null;
}

function findsagag(map) {
  let value = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (!map[i][j]) value++;
    }
  }
  return value;
}

function monitor(i, j, map, dir) {
  const tmp = map.map((item) => [...item]);
  const type = tmp[i][j];
  tmp[i][j] = -1;

  if (type === 1) {
    let nx = i + dx[dir];
    let ny = j + dy[dir];

    while (nx > -1 && ny > -1 && nx < N && ny < M && tmp[nx][ny] !== 6) {
      if ([-1, 1, 2, 3, 4, 5].includes(tmp[nx][ny])) {
        nx += dx[dir];
        ny += dy[dir];
        continue;
      }

      tmp[nx][ny] = -1;
      nx += dx[dir];
      ny += dy[dir];
    }
  }

  if (type === 2) {
    let tmpDir = dir;
    for (let a = 0; a < 2; a++) {
      let nx = i + dx[tmpDir];
      let ny = j + dy[tmpDir];
      while (nx > -1 && ny > -1 && nx < N && ny < M && tmp[nx][ny] !== 6) {
        if ([-1, 1, 2, 3, 4, 5].includes(tmp[nx][ny])) {
          nx += dx[tmpDir];
          ny += dy[tmpDir];
          continue;
        }

        tmp[nx][ny] = -1;
        nx += dx[tmpDir];
        ny += dy[tmpDir];
      }
      tmpDir = (tmpDir + 2) % 4;
    }
  }

  if (type === 3) {
    let tmpDir = dir;
    for (let a = 0; a < 2; a++) {
      let nx = i + dx[tmpDir];
      let ny = j + dy[tmpDir];
      while (nx > -1 && ny > -1 && nx < N && ny < M && tmp[nx][ny] !== 6) {
        if ([-1, 1, 2, 3, 4, 5].includes(tmp[nx][ny])) {
          nx += dx[tmpDir];
          ny += dy[tmpDir];
          continue;
        }

        tmp[nx][ny] = -1;
        nx += dx[tmpDir];
        ny += dy[tmpDir];
      }
      tmpDir = (tmpDir + 1) % 4;
    }
  }

  if (type === 4) {
    let tmpDir = dir;
    for (let a = 0; a < 3; a++) {
      let nx = i + dx[tmpDir];
      let ny = j + dy[tmpDir];
      while (nx > -1 && ny > -1 && nx < N && ny < M && tmp[nx][ny] !== 6) {
        if ([-1, 1, 2, 3, 4, 5].includes(tmp[nx][ny])) {
          nx += dx[tmpDir];
          ny += dy[tmpDir];
          continue;
        }

        tmp[nx][ny] = -1;
        nx += dx[tmpDir];
        ny += dy[tmpDir];
      }
      tmpDir = (tmpDir + 1) % 4;
    }
  }

  if (type === 5) {
    let tmpDir = dir;
    for (let a = 0; a < 4; a++) {
      let nx = i + dx[tmpDir];
      let ny = j + dy[tmpDir];
      while (nx > -1 && ny > -1 && nx < N && ny < M && tmp[nx][ny] !== 6) {
        if ([-1, 1, 2, 3, 4, 5].includes(tmp[nx][ny])) {
          nx += dx[tmpDir];
          ny += dy[tmpDir];
          continue;
        }

        tmp[nx][ny] = -1;
        nx += dx[tmpDir];
        ny += dy[tmpDir];
      }
      tmpDir = (tmpDir + 1) % 4;
    }
  }

  return tmp;
}
