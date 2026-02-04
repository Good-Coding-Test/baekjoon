function solution(maps) {
  var answer = 0;

  let visited = Array.from({ length: maps.length }, () =>
    Array(maps[0].length).fill(-1),
  );

  let needVisit = ["0,0"];
  visited[0][0] = 1;
  const dx = [-1, 0, 0, 1];
  const dy = [0, -1, 1, 0];

  while (needVisit.length) {
    const [x, y] = needVisit.shift().split(",").map(Number);

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < maps.length &&
        ny < maps[0].length &&
        visited[nx][ny] === -1 &&
        maps[nx][ny]
      ) {
        visited[nx][ny] = visited[x][y] + 1;
        needVisit.push(`${nx},${ny}`);
      }
    }
  }

  answer = visited[maps.length - 1][maps[0].length - 1];

  return answer;
}
