function solution(arrows) {
  var answer = 0;

  const dx = [0, 1, 1, 1, 0, -1, -1, -1];
  const dy = [1, 1, 0, -1, -1, -1, 0, 1];

  let x = 0;
  let y = 0;
  const visitedVertex = new Set();
  const visitedEdge = new Set();

  visitedVertex.add("0,0");

  for (let arrow of arrows) {
    for (let i = 0; i < 2; i++) {
      const nx = x + dx[arrow];
      const ny = y + dy[arrow];

      const currentPos = `${x},${y}`;
      const nextPos = `${nx},${ny}`;

      if (
        visitedVertex.has(nextPos) &&
        !visitedEdge.has(`${currentPos}->${nextPos}`)
      ) {
        answer++;
      }

      visitedVertex.add(nextPos);
      visitedEdge.add(`${currentPos}->${nextPos}`);
      visitedEdge.add(`${nextPos}->${currentPos}`);

      x = nx;
      y = ny;
    }
  }

  return answer;
}
