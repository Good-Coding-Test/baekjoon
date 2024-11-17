const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

//목표지점 x,y
const goalX = parseInt(input[0].split(" ")[0]) - 1;
const goalY = parseInt(input[0].split(" ")[1]) - 1;
const map = input.slice(1).map((item) => item.split("").map(Number)); // 전체 맵
// 상하좌우 델타x,y 값
const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

const visited = []; // 방문한 곳
const needVisit = []; // 방문해야 하는 곳(큐)

const length = map.map((item) => item.map((item) => 0)); // 최단거리를 구하기 위한 길이 배열

function BFS() {
  needVisit.push("0,0");
  length[0][0] = 1;

  // 탐색해야 하는 곳이 있다면 반복
  while (needVisit.length !== 0) {
    const node = needVisit.shift();
    const x = parseInt(node.split(",")[0]);
    const y = parseInt(node.split(",")[1]);
    visited.push(node);

    // 종료지점에 도착하면 반복 종료
    if (x === goalX && y === goalY) continue;
    // 상하좌우 탐색
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (
        // 맵을 벗어나거나, 아직 탐색하지 않은 곳일 때만 실행
        nx >= 0 &&
        ny >= 0 &&
        nx <= goalX &&
        ny <= goalY &&
        map[nx][ny] &&
        length[nx][ny] === 0
      ) {
        length[nx][ny] = length[x][y] + 1; // 전 경로의 길이+1 값을 이후 경로에 저장
        needVisit.push(nx + "," + ny);
      }
    }
  }

  return length[goalX][goalY];
}

console.log(BFS());
