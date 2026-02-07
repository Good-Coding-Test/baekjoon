function solution(rectangle, characterX, characterY, itemX, itemY) {
  let map = Array.from({ length: 102 }, () => Array(102).fill(false));
  let visited = new Set();
  let needVisit = [];
  const dx = [-1, 0, 0, 1];
  const dy = [0, -1, 1, 0];

  characterX *= 2;
  characterY *= 2;
  itemX *= 2;
  itemY *= 2;

  for (let [x1, y1, x2, y2] of rectangle) {
    for (let i = x1 * 2; i <= x2 * 2; i++) {
      for (let j = y1 * 2; j <= y2 * 2; j++) {
        map[i][j] = true;
      }
    }
  }

  for (let [x1, y1, x2, y2] of rectangle) {
    for (let i = x1 * 2 + 1; i < x2 * 2; i++) {
      for (let j = y1 * 2 + 1; j < y2 * 2; j++) {
        map[i][j] = false;
      }
    }
  }

  needVisit.push(`${characterX},${characterY}`);
  visited.add(`${characterX},${characterY}`);
  map[characterX][characterY] = 1;

  while (needVisit.length) {
    const [x, y] = needVisit.shift().split(",").map(Number);
    const depth = map[x][y];

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (map[nx][ny] && !visited.has(`${nx},${ny}`)) {
        visited.add(`${nx},${ny}`);
        map[nx][ny] = depth + 1;
        needVisit.push(`${nx},${ny}`);
      }
    }
  }

  return Math.floor(map[itemX][itemY] / 2);
}
