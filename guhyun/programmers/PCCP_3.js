function solution(points, routes) {
  var answer = 0;
  const timeMap = new Map();

  for (let route of routes) {
    let time = 0;
    let [x, y] = points[route[0] - 1];

    for (let i = 1; i < route.length; i++) {
      const [nx, ny] = points[route[i] - 1];

      while (x !== nx) {
        record(time++, x, y);
        x < nx ? x++ : x--;
      }

      while (y !== ny) {
        record(time++, x, y);
        y < ny ? y++ : y--;
      }
    }

    record(time, x, y);
  }

  function record(t, x, y) {
    if (!timeMap.get(t)) timeMap.set(t, new Map());

    const key = `${x},${y}`;
    const map = timeMap.get(t);
    map.set(key, (map.get(key) ?? 0) + 1);
  }

  for (let [_, map] of timeMap) {
    for (let [_, count] of map) {
      count >= 2 && answer++;
    }
  }

  return answer;
}
