const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = parseInt(input[0]);
const board = input.slice(1).map((item) => item.split(" ").map(Number));
let answer = 0;

for (let i = 0; i < 4; i++) {
  DFS(0, board);
}

function DFS(count, map) {
  if (count === 5) {
    answer = Math.max(answer, Math.max(...map.flat()));
    return;
  }

  for (let i = 0; i < 4; i++) {
    const board = move(i, map);
    DFS(count + 1, board);
  }
}

function move(dir, map) {
  const tmpMap = map.map((item) => [...item]);

  if (dir === 0) {
    for (let y = 0; y < N; y++) {
      let newCol = [];
      let isMerged = Array(N).fill(false);

      for (let x = 0; x < N; x++) {
        if (tmpMap[x][y]) {
          newCol.push(tmpMap[x][y]);
        }
      }

      let i = 0;
      let resultCol = Array(N).fill(0);

      while (newCol.length) {
        let current = newCol.shift();

        if (newCol.length > 0 && newCol[0] === current && !isMerged[i]) {
          resultCol[i] = current * 2;
          newCol.shift();
          isMerged[i] = true;
        } else {
          resultCol[i] = current;
        }
        i++;

        for (let k = 0; k < N; k++) {
          tmpMap[k][y] = resultCol[k];
        }
      }
    }
  }
  if (dir === 1) {
    for (let y = 0; y < N; y++) {
      let newCol = [];
      let isMerged = Array(N).fill(false);

      for (let x = N - 1; x >= 0; x--) {
        if (tmpMap[x][y]) {
          newCol.push(tmpMap[x][y]);
        }
      }

      let i = 0;
      let resultCol = Array(N).fill(0);

      while (newCol.length) {
        let current = newCol.shift();

        if (newCol.length > 0 && newCol[0] === current && !isMerged[i]) {
          resultCol[i] = current * 2;
          newCol.shift();
          isMerged[i] = true;
        } else {
          resultCol[i] = current;
        }
        i++;

        for (let k = 0; k < N; k++) {
          tmpMap[k][y] = resultCol[k];
        }
      }
    }
  }
  if (dir === 2) {
    for (let x = 0; x < N; x++) {
      let newRow = [];
      let isMerged = Array(N).fill(false);

      for (let y = 0; y < N; y++) {
        if (tmpMap[x][y]) {
          newRow.push(tmpMap[x][y]);
        }
      }

      let i = 0;
      let resultRow = Array(N).fill(0);

      while (newRow.length) {
        let current = newRow.shift();

        if (newRow.length > 0 && newRow[0] === current && !isMerged[i]) {
          resultRow[i] = current * 2;
          newRow.shift();
          isMerged[i] = true;
        } else {
          resultRow[i] = current;
        }
        i++;

        for (let k = 0; k < N; k++) {
          tmpMap[x][k] = resultRow[k];
        }
      }
    }
  }

  if (dir === 3) {
    for (let x = 0; x < N; x++) {
      let newRow = [];
      let isMerged = Array(N).fill(false);

      for (let y = N - 1; y >= 0; y--) {
        if (tmpMap[x][y]) {
          newRow.push(tmpMap[x][y]);
        }
      }

      let i = 0;
      let resultRow = Array(N).fill(0);

      while (newRow.length) {
        let current = newRow.shift();

        if (newRow.length > 0 && newRow[0] === current && !isMerged[i]) {
          resultRow[i] = current * 2;
          newRow.shift();
          isMerged[i] = true;
        } else {
          resultRow[i] = current;
        }
        i++;

        for (let k = 0; k < N; k++) {
          tmpMap[x][k] = resultRow[k];
        }
      }
    }
  }
  return tmpMap;
}

console.log(answer);
